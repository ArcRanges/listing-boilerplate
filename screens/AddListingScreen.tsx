import React, {useState, useEffect} from 'react'
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity 
} from 'react-native'

import {
  TextInput
} from 'react-native-paper';

import { showMessage } from "react-native-flash-message";

import Spinner from 'react-native-loading-spinner-overlay';

export default function AddListingScreen({navigation}) {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  
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

  useEffect(()=> {
    navigation.setOptions({
      headerRight: () => 
      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={{color: 'black', fontWeight: 'bold' }}>DONE</Text>
      </TouchableOpacity>
    })
  }, [loading, title])
  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
      />
      <Text style={styles.title}>Add New Listing</Text>
      <View style={styles.formContainer}>
        <TextInput
          label="Title"
          value={title}
          mode="outlined"
          placeholder="Write something descriptive"
          onChangeText={text => setTitle(text)}
        />
        <TextInput
          label="Description"
          value={title}
          mode="outlined"
          placeholder="Write something descriptive"
          onChangeText={text => setTitle(text)}
        />
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
  }
})