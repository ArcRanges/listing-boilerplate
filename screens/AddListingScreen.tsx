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
import ModalSelector from 'react-native-modal-selector'

import qs from 'qs-stringify';

import {CAR_DATA_API} from '../config';
import CAR_DATA from '../car_data';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AddListingScreen({navigation, route}) {
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState('')
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')

  const [YEAR_DATA, setYearData] = useState([]);
  const [MAKE_DATA, setCarData] = useState([]);
  const [MODEL_DATA, setModelData] = useState([]);

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

  const loadMake = () => {
    // console.log(CAR_DATA_API);

    fetch(CAR_DATA_API.url +  '/classes/Car_Model_List', {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': 'qgxAeRBd4700KqnpinqniHftxVVq807Bv9W6nBIB',
        'X-Parse-REST-API-Key': 'Q3KSht6u6UPmKkUOCyydQzCaOIeZCVfM3JfzBCe3',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: qs({
        year: year
      })
    }).then((res)=> {
      console.log(res);
      
    }).catch((err)=> {
      console.log(err);
      
    })
  }

  const loadModel = async (carMake) => {
    setLoading(true)
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${carMake.toLowerCase()}?format=json`
    console.log(make);
    
    await fetch(url).then((res)=> res.json())
    .then((res)=>{
      console.log(res);
      setLoading(false)
      generateModelData(res.Results)
    }).catch((err)=> {
      console.log(err);
      setLoading(false)
    })
  }
  const selectYear = (y) => {
    setYear(y)
    // loadMake()
  }

  const selectMake = (opt) => {
    setMake(opt.label)
    loadModel(opt.label)
  }

  const selectModel = (opt) => {
    setModel(opt.label)
  }

  useEffect(()=> {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => 
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={{color: 'black', fontWeight: 'bold' }}>DONE</Text>
      </TouchableOpacity>
    })
    
    generateYearData();
    generateMakeData();

    // if (route.params && route.params.images) {
    //   console.log(images);
    // }
  }, [loading, images, choosingImages, year, make, model]);

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
        <ModalSelector
          data={YEAR_DATA}
          initValue="Select Year"
          scrollViewAccessibilityLabel={'Scrollable options'}
          onChange={(option)=>{ selectYear(option.key) }}
        >
          <TextInput
            label="Year"
            value={year.toString()}
            editable={false}
            mode="outlined"
            placeholder="Select Year"
          />
        </ModalSelector>
        
        <ModalSelector
          data={MAKE_DATA}
          initValue="Select Make"
          scrollViewAccessibilityLabel={'Scrollable options'}
          onChange={(option)=>{ selectMake(option) }}
        >
          <TextInput
            label="Make"
            value={make.toString()}
            editable={false}
            mode="outlined"
            placeholder="Make"
          />
        </ModalSelector>


        <ModalSelector
          data={MODEL_DATA}
          initValue="Select Make"
          scrollViewAccessibilityLabel={'Scrollable options'}
          onChange={(option)=>{ selectModel(option) }}
        >
          <TextInput
            label="Model"
            value={model}
            mode="outlined"
            placeholder="Select Model"
            onChangeText={text => setModel(text)}
          />
        </ModalSelector>
        {/* <TextInput
          label="Make"
          value={make}
          mode="outlined"
          placeholder="Write something descriptive"
          onChangeText={text => setMake(text)}
        /> */}
        
       

        <TouchableOpacity style={styles.selectImagesBtnStyle}
          onPress={()=> navigation.navigate('BrowseImages')}>
          <Text style={{color: 'white', fontWeight: 'bold' }}>{images.length != 0 ? "Change Selected Images" : "Select Images"}</Text>
        </TouchableOpacity>

        { images.length != 0 &&
          <View style={{ marginTop: 10, }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Images Selected</Text>

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
    borderColor: 'lightgray',
    borderWidth: 2,
    margin: 10
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