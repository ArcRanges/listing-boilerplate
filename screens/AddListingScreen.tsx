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

import { showMessage } from "react-native-flash-message";
import Spinner from 'react-native-loading-spinner-overlay';
import ImageBrowser from 'rn-multiple-image-picker';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AddListingScreen({navigation, route}) {
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')

  const [images, setImages] = useState([]);
  const [choosingImages, setChoosingImages] = useState(false)

  const onSubmit = () => {
    setLoading(true)

    setTimeout(()=> {
      setLoading(false)
      showMessage({
        message: "Success!",
        description: "This listing has been successfully added.",
        type: "success",
      });
      navigation.goBack()
    },1000)
  }

  useFocusEffect(
    React.useCallback(() => {
      // console.log(route);
      if (route.params && route.params.images.length){
        // console.log(route);
        let {images} = route.params;
        // console.log(images);
        setImages(images)
      }
    }, [route.params])
  )

  useEffect(()=> {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => 
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={{color: 'black', fontWeight: 'bold' }}>DONE</Text>
      </TouchableOpacity>
    })
    
    if (route.params && route.params.images) {
      console.log(images);
    }
  }, [loading, images, choosingImages]);

  const handleImages = (images) => {
    console.log(images);
    
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
      />
      <Text style={styles.title}>Add New Listing</Text>
      <View style={styles.formContainer}>
        <TextInput
          label="Year"
          value={year}
          mode="outlined"
          placeholder="Write something descriptive"
          onChangeText={text => setYear(text)}
        />
        <TextInput
          label="Make"
          value={make}
          mode="outlined"
          placeholder="Write something descriptive"
          onChangeText={text => setMake(text)}
        />
        
        <TextInput
          label="Model"
          value={model}
          mode="outlined"
          placeholder="Write something descriptive"
          onChangeText={text => setModel(text)}
        />

        <TouchableOpacity style={styles.selectImagesBtnStyle}
          onPress={()=> navigation.navigate('BrowseImages')}>
          <Text style={{color: 'white', fontWeight: 'bold' }}>{images.length != 0 ? "Change Selected Images" : "Select Images"}</Text>
        </TouchableOpacity>

        { images.length != 0 &&
          <View style={{ marginTop: 10, }}>
            <Text style={{fontSize: 16}}>Images Selected</Text>

            <View style={styles.imagesContainer}>
              {images.map((img, index)=> {
                return (
                  <ImageBackground 
                    key={index}
                    style={styles.imgContainer} 
                    source={{uri: img.uri}}
                  />
                )
              })}
            </View>
          </View>
        }
        
      </View>
     
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  submitButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginRight: 15,
    padding: 10
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
    justifyContent: 'space-evenly', 
    alignItems: 'center',
    marginTop: 15
  },
  imgContainer: { 
    height: SCREEN_WIDTH/4, 
    width: SCREEN_WIDTH/4
  },
  selectImagesBtnStyle: { 
    width: '100%', 
    padding: 20, 
    borderWidth: 1,
    borderRadius: 5, 
    marginTop: 10, 
    backgroundColor: 'black',
  }
})