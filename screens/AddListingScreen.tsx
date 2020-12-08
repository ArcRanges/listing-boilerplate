import React, {useState, useEffect, useCallback} from 'react'
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

import {CAR_DATA_API} from '../config';
import CAR_DATA from '../car_data';
import { ScrollView } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AddListingScreen({navigation, route}) {
  const { user } = route.params;
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState('')
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [description, setDescription] = useState('')

  const [YEAR_DATA, setYearData] = useState([]);
  const [MAKE_DATA, setCarData] = useState([]);
  // const [MODEL_DATA, setModelData] = useState([]);

  const [images, setImages] = useState([]);
  // const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [choosingImages, setChoosingImages] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  const dbref = firebase.database();

  const convertImageToBlob = async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }
  const uploadImages = async (list_key) => {
    const uploadProgress = await new Promise((resolve, reject)=> {
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
            let current = (taskSnapshot.bytesTransferred/taskSnapshot.totalBytes) / images.length;
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
            firebase.database().ref('/listings/' + list_key  + '/images').update(updates) 
          });
        })
      ).then(()=> {
        setTimeout(()=> {
          showMessage({
            message: "Success!",
            description: "This listing has been successfully added.",
            type: "success",
          });
          
          // setLoading(false)
          navigation.goBack()
        }, 2000)
      })
    });
  }

  const allFieldsAreValid = () => {
    console.log( year === '' || 
    make === '' ||
    model === '' ||
    description === '' );
    
    return parseInt(price) === 0 ||
      year === '' || 
      make === '' ||
      model === '' ||
      description === '' ||
      images.length === 0;
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

    const _dateCreated = firebase.database.ServerValue.TIMESTAMP;
    let data = {
      price,
      year,
      make,
      model,
      description,
      _dateCreated,
      _createdBy: user.uid
    }

    if (Object.entries(data).length !== 0) {
      let make_lower = make.toLowerCase();
      let list_key = dbref
        .ref('/listings/')
        .push()
        .key;
      
      dbref.ref('/listings/' + list_key)
        .set(data)
        .then(()=> {
          console.log("successfully inserted new data");
        })
      
      dbref.ref('users/' + user.uid + '/listings').limitToLast(1).once('value').then((snapshot => {
        // let index = snapshot.val() == null ? 0 : snapshot.val()._index;
        let listing = {
          _id: list_key,
        }
        // let listing = {}
        // listing[index] = list_key;
        // listing["_index"] = index;
        dbref.ref('users/' + user.uid + '/listings').push(listing)
      }));

      uploadImages(list_key);

    } else {
      setLoading(false)
    }
   
  }

  useFocusEffect(
    React.useCallback(() => {
      // console.log(route);
      if (route.params.images && route.params.images.length){
        // console.log(route);
        let {images} = route.params;
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
    let data = CAR_DATA.sort((a,b) => a.name > b.name);
    data.map((d, i)=> {
      arr.push({"label": d.name, "key": d.id})
    })
    setCarData(arr)
  }

  const generateModelData = (data) => {
    let arr = [];
    dx = data.sort((a,b)=> a.Model_Name > b.Model_Name)
    dx.map((d, i)=> {
      arr.push({"label": d.Model_Name, "key": d.Make_ID})
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

  useEffect(()=> {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => 
      <TouchableOpacity style={[styles.submitButton, ]} onPress={onSubmit} disabled={loading}>
        <Text style={{color: 'black', fontWeight: 'bold' }}>DONE</Text>
      </TouchableOpacity>
    })
    
    generateYearData();
    generateMakeData();

    // if (route.params && route.params.images) {
    //   console.log(images);
    // }
  }, [loading, images, choosingImages, year, make, model]);

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={styles.container}>
      <Spinner
        visible={loading}
      />
      {loading && 
        <ProgressBar 
          progress={currentProgress} 
          width={SCREEN_WIDTH}
          borderRadius={0}
          height={3}
          useNativeDriver={true}
          color={'black'}
          unfilledColor={'lightgray'}
          borderWidth={0}
          style={{ position: 'absolute'}}
        />
      }
      
      <Text style={styles.title}>Add New Listing</Text>
      <View style={styles.formContainer}>
        <TextInput
          label="Price"
          value={price.toString()}
          mode="outlined"
          placeholder="Enter a number"
          onChangeText={text => setPrice(text)}
          theme={{ colors: { primary: '#808080',}}}
        />
        <ModalSelector
          data={YEAR_DATA}
          initValue="Select Year"
          scrollViewAccessibilityLabel={'Scrollable options'}
          onChange={(option)=>{ selectYear(option.key) }}
          disabled={price == ''}
        >
          <TextInput
            disabled={price == ''}
            label="Year"
            value={year.toString()}
            editable={false}
            mode="outlined"
            placeholder="Select Year"
            theme={{ colors: { primary: '#808080',}}}
          />
        </ModalSelector>
        
        <ModalSelector
          data={MAKE_DATA}
          disabled={price == '' || year == ''}
          initValue="Select Make"
          scrollViewAccessibilityLabel={'Scrollable options'}
          onChange={(option)=>{ selectMake(option) }}
        >
          <TextInput
            label="Make"
            disabled={price == '' || year == ''}
            value={make.toString()}
            editable={false}
            mode="outlined"
            placeholder="Make"
            theme={{ colors: { primary: '#808080',}}}
          />
        </ModalSelector>

        <TextInput
          label="Model"
          disabled={price == '' || year == '' || make =='' }
          value={model}
          mode="outlined"
          placeholder="Select Model"
          onChangeText={text => setModel(text)}
          theme={{ colors: { primary: '#808080',}}}
        />

        <TextInput
          label="Short Description"
          value={description}
          disabled={price == '' || year == '' || make =='' }
          mode="outlined"
          placeholder="Be as descriptive as possible"
          theme={{ colors: { primary: '#808080',}}}
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
          onPress={()=> navigation.navigate('BrowseImages')}>
          <Text style={{color: 'black', fontWeight: 'bold' }}>{images.length != 0 ? "Change Selected Images" : "Select Images"}</Text>
        </TouchableOpacity>

        { images.length != 0 ?
          <View style={{ marginTop: 10, }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Images Selected</Text>

            <View style={styles.imagesContainer}>
              {images.map((img, index)=> {
                return (
                  <ImageBackground 
                    key={index}
                    style={[styles.imgContainer, ]} 
                    source={{uri: img.uri}}
                  />
                )
              })}
            </View>
          </View> :
          <View style={{ marginTop: 10, }}>
            <View style={styles.imagesContainer}>
              {[1,2,3,4,5,6].map((img, index)=> {
                return (
                  <View 
                    key={index}
                    style={[{backgroundColor: '#fafafa'},styles.imgContainer ]}
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
  }
})