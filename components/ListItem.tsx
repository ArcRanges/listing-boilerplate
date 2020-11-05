import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import {
  Subheading,
  Paragraph,
  Button
} from 'react-native-paper';

const ListItem = ({item, hideAdd}) => {
  const addCommas = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const getColor = (s) => {
    if (s == 'sold') return 'rgba(0,0,0, 0.5)';
    if (s == 'available') return 'rgba(0,0,0,1)';
    if (s == 'pending') return 'rgba(0,0,0,0.1)';
  }
  
  return (
    <View style={styles.listItemContainer}>
      <View>
        <Subheading style={{ fontWeight: 'bold'}}>
          {item.name}
        </Subheading>
        <Paragraph>
          <Text style={styles.price}>${addCommas(item.price)}</Text>
        </Paragraph>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {/* <Button mode="contained" 
          style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: getColor(item.status)}}
        >
          { item.status == 'available' ? "Message" : item.status}
        </Button> */}
        <Ionicons name="ios-arrow-dropright" color="black" size={32} style={{marginRight: 10}}/>
        {!hideAdd && <Ionicons name="ios-add-circle-outline" size={32} color="black" />}
      </View>
      
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
  price: {
    fontWeight: 'bold',
    color: 'red'
  },
  listItemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
    marginBottom: 0,
    margin: 10,
  },
})