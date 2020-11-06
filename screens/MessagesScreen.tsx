import React, {useState, useEffect} from 'react'
import { 
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import ChatItem from '../components/ChatItem';

const DATA = {
  "messages": [
    {
      "id": 1,
      "username": "Jamie S.",
      "message": [
        {
          "id": 1,
          "text": "lorem ipsuum?"
        },{
          "id": 2,
          "text": "eyes ipsuum?"
        },{
          "id": 3,
          "text": "yem"
        }
      ]
    },{
      "id": 2,
      "username": "Arc S.",
      "message": [
        {
          "id": 1,
          "text": "lorem ipsuum?"
        },{
          "id": 2,
          "text": "eyes ipsuum?"
        },{
          "id": 3,
          "text": "yem"
        }
      ]
    }
  ]
};

export default function MessagesScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(DATA.parts);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Ionicons name="ios-list" size={24} color="black" style={{ marginLeft: 15}}/>
    })
  }, [])


  const onRefresh = () => {
    console.log("refreshing ...");
  }

  return (
    <FlatList
      style={styles.container}
      data={DATA.messages}
      keyExtractor={( item ) => item.id.toString()}
      renderItem={(item) => <ChatItem item={item.item} navigation={navigation}/>}
      extraData={loading}
      refreshing={loading}
      onRefresh={onRefresh}
    />
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  
});