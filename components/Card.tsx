import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import {
  Placeholder,
  PlaceholderLine,
  Shine,
} from "rn-placeholder";

export const CardPlaceholder = () => {
  return (
    <Placeholder
      Animation={Shine}>
      <PlaceholderLine width={100} style={{ height: 150, borderTopLeftRadius: 15, borderTopRightRadius: 15}}/>
      <PlaceholderLine width={75} style={{ marginLeft: 10, height: 20 }} />
      <View style={styles.buttonStyle}>
        <PlaceholderLine width={25} style={{ marginLeft: 10, height: 20 }} />
        <PlaceholderLine width={25} style={{ marginRight: 10, height: 20 }} />
      </View>
    </Placeholder>
  )

}
export default function Card({navigation, data, isAllowedEditing}) {
  return (
    <View style={styles.listingBox}>
      <Image source={{ uri: data.images && data.images[0]}} 
        resizeMode={'cover'} 
        style={styles.imageStyle}
        defaultSource={require('../assets/images/no-img.png')}
      />
      <View style={styles.containerStyle}>
        <Text style={styles.cardTitle}>{data.title}</Text>
         {/*<Text style={styles.cardSubtitle}>{`${data.location.city}, ${data.location.province}`}</Text>
        <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 12, fontStyle: 'italic'}}>Posted 2 days ago in </Text> */}

        
        {isAllowedEditing && 
          <TouchableOpacity style={styles.buttonStyle}
            onPress={()=> navigation.navigate('EditListing', {data})}
          >
            <Text style={{ color: 'black', }}>Edit Listing</Text>
            <Ionicons name="md-create" color="black" size={24}/>
          </TouchableOpacity>
        }
        {!isAllowedEditing &&
          <TouchableOpacity  style={styles.buttonStyle}
            onPress={()=> navigation.navigate('Listing', {data})}
          >
           <Text style={{ color: 'black', }}>View More</Text>
 
           <Ionicons name="ios-arrow-dropright" color="black" size={28}/>
         </TouchableOpacity>
        }
       
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 150, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15
  },
  containerStyle: { 
    alignItems: 'flex-start',
    padding: 10
  },
  cardTitle: { 
    color: 'rgba(0,0,0,1)', 
    fontSize: 16, 
    // fontWeight: 'bold'
  },
  cardSubtitle: { 
    color: 'rgba(0,0,0,0.8)', 
    fontSize: 12
  },
  listingBox: { 
    width: '45%', 
    margin: 5, 
    padding: 0, 
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 250,
    borderColor: 'lightgray',
    borderWidth: 1
  },
  buttonStyle: { 
    marginTop: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%'
  }
});