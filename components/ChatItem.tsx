import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import {
  Subheading,
  Paragraph,
  Button,
  Avatar
} from 'react-native-paper';

const ChatItem = ({item, hideNext, navigation}) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.box1}>
        <Avatar.Image size={48} source={{uri: 'https://picsum.photos/64/64'}} style={{ marginRight: 10}} />
        <View>
          <Subheading style={{ fontWeight: 'bold'}}>
            {item.username}
          </Subheading>
          <Paragraph>
            <Text style={styles.lastMessage}>{item.message[0].text}</Text>
          </Paragraph>
        </View>
        
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        {!hideNext && 
          <TouchableOpacity onPress={()=> navigation.navigate('Message', {})}>
            <Ionicons name="ios-arrow-dropright" color="black" size={32} style={{marginRight: 10}}/>
          </TouchableOpacity>
        }
      </View>
      
    </View>
  )
}

export default ChatItem

const styles = StyleSheet.create({
  lastMessage: {
    fontStyle: 'italic',
    color: 'darkgray'
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center'
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