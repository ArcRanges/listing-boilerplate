import React, {useEffect} from 'react'
import { View, Text,SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
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
  
  const TopNavigator = (props) => (
    <View style={styles.navigatorStyle}>
      <TouchableOpacity style={styles.btnStyle} onPress={()=> navigation.pop()}>
        <Text style={{color: 'black', fontWeight: 'bold' }}>BACK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnStyle} onPress={props.onFinish}>
        <Text style={{color: 'black', fontWeight: 'bold' }}>DONE</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <AssetsSelector
      options={{
        assetsType: ['photo'],
        noAssetsText: 'No media found.',
        maxSelections: 6,
        margin: 3,
        portraitCols: 4,
        landscapeCols: 5,
        widgetWidth: 100,
        widgetBgColor: 'white',
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
        CustomTopNavigator: {
          Component: TopNavigator,
          props: {
            backFunction: true,
            doneFunction: (data: Asset[]) => navigation.navigate("AddListing", {'images': data}),
          },
        }
            
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
  navigatorStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 15,
    padding: 10
  },
});

// defaultTopNavigator: {
//   continueText: 'Finish',
//   goBackText: 'Back',
//   buttonBgColor: 'white',
//   buttonTextColor: 'black',
//   midTextColor: 'black',
//   backFunction: ()=> navigation.pop(),
//   doneFunction: data => navigation.navigate("AddListing", {'images': data}),
// },