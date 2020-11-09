import React, {useEffect} from 'react'
import { View, Text,SafeAreaView, StyleSheet } from 'react-native'
import { AssetsSelector } from 'expo-images-picker'
import {Ionicons} from '@expo/vector-icons'

export default function BrowseImageScreen({navigation}) {
  // const { handleImages } = navigation;
  // console.log(handleImages);
  

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
 
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <AssetsSelector
      options={{
        assetsType: ['photo'],
        noAssetsText: 'No media found.',
        maxSelections: 5,
        margin: 3,
        portraitCols: 4,
        landscapeCols: 5,
        widgetWidth: 100,
        widgetBgColor: 'white',
        selectedBgColor: 'blue',
        videoIcon: {
            Component: Ionicons,
            iconName: 'ios-videocam',
            color: 'white',
            size: 20,
        },
        selectedIcon: {
            Component: Ionicons,
            iconName: 'ios-checkmark-circle-outline',
            color: 'black',
            bg: 'rgba(255,255,255, 0.8)',
            size: 23,
        },
        defaultTopNavigator: {
            continueText: 'Finish',
            goBackText: 'Back',
            buttonBgColor: 'white',
            buttonTextColor: 'black',
            midTextColor: 'black',
            backFunction: ()=> navigation.pop(),
            doneFunction: data => navigation.navigate("AddListing", {'images': data}),
        },
        
    }}
/>
    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
