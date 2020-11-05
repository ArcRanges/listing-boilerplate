import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

export default function Card({navigation, data}) {
  return (
    <View style={styles.listingBox}>
      <Image source={{ uri: data.img_url}} 
        resizeMode={'cover'} 
        style={styles.imageStyle}
      />
      <View style={styles.containerStyle}>
        <Text style={styles.cardTitle}>{data.title}</Text>
        <Text style={styles.cardSubtitle}>{`${data.location.city}, ${data.location.province}`}</Text>
        {/* <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 12, fontStyle: 'italic'}}>Posted 2 days ago in </Text> */}
        <TouchableOpacity  style={styles.buttonStyle}
          onPress={()=> navigation.navigate('Listing', {data})}
        >
          <Text style={{ color: 'black', fontWeight: 'bold' }}>View More</Text>

          <Ionicons name="ios-arrow-dropright" color="black" size={28}/>
        </TouchableOpacity>
        
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
    fontWeight: 'bold'
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
    borderColor: 'black',
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