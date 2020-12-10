import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ImageBackground,
    Dimensions,
} from 'react-native'

import {
    TextInput
} from 'react-native-paper';

import firebase from '../firebase/Fire';
import ProgressBar from 'react-native-progress/Bar';
import { showMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import ModalSelector from 'react-native-modal-selector'

import { CAR_DATA_API } from '../config';
import CAR_DATA from '../car_data';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function EditListingScreen({ navigation, route }) {
    const { user, item, key } = route.params;
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState(item.price)
    const [year, setYear] = useState(item.year)
    const [make, setMake] = useState(item.make)
    const [model, setModel] = useState(item.model)
    const [description, setDescription] = useState(item.description)

    const [YEAR_DATA, setYearData] = useState([]);
    const [MAKE_DATA, setCarData] = useState([]);
    // const [MODEL_DATA, setModelData] = useState([]);

    const [currentImages, setCurrentImages] = useState(item.images);
    const [images, setImages] = useState([]);
    // const [allFieldsValid, setAllFieldsValid] = useState(false);
    const [choosingImages, setChoosingImages] = useState(false);
    const [currentProgress, setCurrentProgress] = useState(0);

    const dbref = firebase.database();

    const convertImageToBlob = async (uri) => {
        return await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    }

    const uploadImages = async (list_key) => {
        if (images.length == 0) {
            setTimeout(() => {
                showMessage({
                    message: "Success!",
                    description: "This listing has been successfully updated.",
                    type: "success",
                });

                // setLoading(false)
                navigation.goBack()
            }, 1000)
            return;
        }

        const uploadProgress = await new Promise((resolve, reject) => {
            let percent = 0.0;

            Promise.all(
                images.map(async (img, index) => {
                    const { uri, filename } = img;
                    const file_ext = filename.split('.')[1];

                    // convert to blob
                    const blob = await convertImageToBlob(uri);

                    const ffilename = index + "." + file_ext;
                    const ref = firebase.storage().ref('/images/' + list_key + "/" + ffilename)
                    const task = ref.put(blob);

                    console.log("uploading file : " + ffilename);

                    task.on('state_changed', taskSnapshot => {
                        let current = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) / images.length;
                        setCurrentProgress(currentProgress => current + currentProgress)
                        // console.log("status " + (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes)* 100 + "%");
                    }, error => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                reject("Unauthorized upload")
                                break;
                            case 'storage/canceled':
                                reject("User cancelled upload");
                                break;
                            case 'storage/unknown':
                                reject("An unknown error occurred")
                                break;
                        }
                    }, async () => {
                        // console.log("file " + index + " has been uploaded");
                        blob.close();

                        let url = await ref.getDownloadURL();
                        let updates = {}
                        updates[index] = url;
                        firebase.database().ref('/listings/' + list_key + '/images').update(updates)
                    });
                })
            ).then(() => {
                setTimeout(() => {
                    showMessage({
                        message: "Success!",
                        description: "This listing has been successfully updated.",
                        type: "success",
                    });

                    // setLoading(false)
                    navigation.goBack()
                }, 2000)
            })
        });
    }

    const allFieldsAreValid = () => {

        return parseInt(price) === 0 ||
            year === '' ||
            make === '' ||
            model === '' ||
            description === '';
    }

    const onCancel = () => {
        showMessage({
            message: "Warning!",
            description: "Changes were not saved.",
            type: "warning",
        });
    }

    const onCancelDelete = () => {
        showMessage({
            message: "Warning!",
            description: "Listing was not deleted.",
            type: "warning",
        });
    }

    const deleteListing = () => {
        setLoading(true)
        // delete means turning into inactive status in this case
        const _lastUpdated = firebase.database.ServerValue.TIMESTAMP;

        let list_key = key;
        let data = {
            _lastUpdated,
            status: 'inactive'
        }
        
        dbref.ref('/listings/' + list_key)
            .update(data)
            .then(() => {
                setTimeout(() => {
                    showMessage({
                        message: "Success!",
                        description: "This listing has been deleted.",
                        type: "success",
                    });
                    
                    // setLoading(false)
                    navigation.goBack()
                }, 2000)
            })
    }
    const promptDeleteListing = () => {
        Alert.alert(
            "Delete Listing",
            "Are you sure you want to delete this listing?",
            [
              {
                text: "Cancel",
                onPress: () => onCancelDelete(),
                style: "cancel"
              },
              { text: "OK", onPress: () => deleteListing() }
            ],
            { cancelable: false }
          );
    }

    const promptFinishUpdate = () => {
        Alert.alert(
            "Update Listing",
            "Are you sure you want to save the changes to this listing?",
            [
              {
                text: "Cancel",
                onPress: () => onCancel(),
                style: "cancel"
              },
              { text: "OK", onPress: () => onSubmit() }
            ],
            { cancelable: false }
          );
    }

    const onSubmit = async () => {

        setLoading(true)
        let fieldsValid = allFieldsAreValid()
        if (fieldsValid) {
            // show error message
            setLoading(false)
            console.log("not all fields are valid");
            showMessage({
                message: "Oh no!",
                description: "Please make sure that all required fields are filled.",
                type: "danger",
            });
            return;
        }

        const _lastUpdated = firebase.database.ServerValue.TIMESTAMP;
        let data = {
            price,
            year,
            make,
            model,
            description,
            _lastUpdated,
        }

        if (Object.entries(data).length !== 0) {
            let list_key = key;

            dbref.ref('/listings/' + list_key)
                .update(data)
                .then(() => {
                    console.log("successfully inserted new data");
                })
            uploadImages(list_key);
        } else {
            setLoading(false)
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            // console.log(route);
            if (route.params.images && route.params.images.length) {
                // console.log(route);
                let { images } = route.params;
                setImages(images)
            }
        }, [route.params])
    )

    const generateYearData = () => {
        const MIN_YEAR = 1990;
        const MAX_YEAR = 2020;
        let arr = [];
        for (let i = MIN_YEAR; i <= MAX_YEAR; i++) {
            arr.push({ label: `${i}`, key: i })
        }
        setYearData(arr)
    }

    const generateMakeData = () => {
        let arr = [];
        let data = CAR_DATA.sort((a, b) => a.name > b.name);
        data.map((d, i) => {
            arr.push({ "label": d.name, "key": d.id })
        })
        setCarData(arr)
    }

    const generateModelData = (data) => {
        let arr = [];
        dx = data.sort((a, b) => a.Model_Name > b.Model_Name)
        dx.map((d, i) => {
            arr.push({ "label": d.Model_Name, "key": d.Make_ID })
        })
        setModelData(arr)
    }

    const selectYear = (y) => {
        setYear(y)
    }

    const selectMake = (opt) => {
        setMake(opt.label)
        // loadModel(opt.label)
    }

    const selectModel = (opt) => {
        setModel(opt.label)
    }

    const headerRight = () => (
        <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.submitButton, {marginRight: 5, borderColor: 'tomato'}]} 
                onPress={promptDeleteListing} disabled={loading}>
                <Text style={{ color: 'tomato', fontWeight: 'bold'}}>DELETE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.submitButton,]} onPress={promptFinishUpdate} disabled={loading}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>DONE</Text>
            </TouchableOpacity>
        </View>
    )
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: headerRight
        })

        generateYearData();
        generateMakeData();
    }, [loading, images, choosingImages, year, make, model, description]);

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.container}>
            <Spinner
                visible={loading}
            />
            {loading && images.length != 0 &&
                <ProgressBar
                    progress={currentProgress}
                    width={SCREEN_WIDTH}
                    borderRadius={0}
                    height={3}
                    useNativeDriver={true}
                    color={'black'}
                    unfilledColor={'lightgray'}
                    borderWidth={0}
                    style={{ position: 'absolute' }}
                />
            }

            <Text style={styles.title}>Edit Listing</Text>
            <View style={styles.formContainer}>
                <TextInput
                    label="Price"
                    value={price.toString()}
                    mode="outlined"
                    placeholder="Enter a number"
                    onChangeText={text => setPrice(text)}
                    theme={{ colors: { primary: '#808080', } }}
                />
                <ModalSelector
                    data={YEAR_DATA}
                    initValue="Select Year"
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    onChange={(option) => { selectYear(option.key) }}
                    disabled={price == ''}
                >
                    <TextInput
                        disabled={price == ''}
                        label="Year"
                        value={year.toString()}
                        editable={false}
                        mode="outlined"
                        placeholder="Select Year"
                        theme={{ colors: { primary: '#808080', } }}
                    />
                </ModalSelector>

                <ModalSelector
                    data={MAKE_DATA}
                    disabled={price == '' || year == ''}
                    initValue="Select Make"
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    onChange={(option) => { selectMake(option) }}
                >
                    <TextInput
                        label="Make"
                        disabled={price == '' || year == ''}
                        value={make.toString()}
                        editable={false}
                        mode="outlined"
                        placeholder="Make"
                        theme={{ colors: { primary: '#808080', } }}
                    />
                </ModalSelector>

                <TextInput
                    label="Model"
                    disabled={price == '' || year == '' || make == ''}
                    value={model}
                    mode="outlined"
                    placeholder="Select Model"
                    onChangeText={text => setModel(text)}
                    theme={{ colors: { primary: '#808080', } }}
                />

                <TextInput
                    label="Short Description"
                    value={description}
                    disabled={price == '' || year == '' || make == ''}
                    mode="outlined"
                    placeholder="Be as descriptive as possible"
                    theme={{ colors: { primary: '#808080', } }}
                    onChangeText={text => setDescription(text)}
                />
                {/*
                    <ModalSelector
                    data={MODEL_DATA}
                    initValue="Select Make"
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    onChange={(option)=>{ selectModel(option) }}
                    >
                    
                    </ModalSelector>
                    <TextInput
                    label="Make"
                    value={make}
                    mode="outlined"
                    placeholder="Write something descriptive"
                    onChangeText={text => setMake(text)}
                /> */}



                <TouchableOpacity style={styles.selectImagesBtnStyle}
                    onPress={() => navigation.navigate('BrowseImages')}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{images.length != 0 ? "Change Selected Images" : "Change Current Images"}</Text>
                </TouchableOpacity>

                {currentImages.length != 0 ?
                    <View style={{ marginTop: 10, }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Images Selected</Text>

                        <View style={styles.imagesContainer}>
                            {currentImages.map((img, index) => {
                                return (
                                    <ImageBackground
                                        key={index}
                                        style={[styles.imgContainer,]}
                                        source={{ uri: img }}
                                    />
                                )
                            })}
                        </View>
                    </View> :
                    <View style={{ marginTop: 10, }}>
                        <View style={styles.imagesContainer}>
                            {[1, 2, 3, 4, 5, 6].map((img, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={[{ backgroundColor: '#fafafa' }, styles.imgContainer]}
                                    />
                                )
                            })}
                        </View>
                    </View>
                }

            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    submitButton: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginRight: 15,
        padding: 10
    },
    yearPickerStyle: {
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: 'black',
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 15
    },
    formContainer: {
        padding: 10
    },
    imagesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    imgContainer: {
        height: (Dimensions.get('window').width / 3) - 30,
        width: (Dimensions.get('window').width / 3) - 30,
        borderWidth: 1,
        borderColor: 'lightgray',
        margin: 10
    },
    selectImagesBtnStyle: {
        width: '100%',
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: 'white',
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
})