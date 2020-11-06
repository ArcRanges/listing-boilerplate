import React, {useState, useEffect} from 'react'
import { 
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'

import { Ionicons } from '@expo/vector-icons';

import ListItem from '../components/ListItem';

const DATA = {
  "id": 1,
  "title": "Acura 2019 TLX",
  "img_url": "https://static.cargurus.com/images/article/2017/05/10/15/27/2018_acura_tlx_preview_overview-pic-7309079428147800010-200x200.jpeg",
  "location": {
    "city": "Vancouver",
    "province": "BC"
  },
  "parts": [
    {
      "name": "Rear View Mirror",
      "price": 300,
      "status": 'sold',
      "id": 1
    },
    {
      "name": "Subwoofer",
      "price": 100,
      "status": 'available',
      "id": 2
    },
    {
      "name": "Spoiler",
      "price": 250,
      "status": 'pending',
      "id": 3
    },
    {
      "name": "Wings",
      "price": 20050,
      "status": 'available',
      "id": 4
    },
    {
      "name": "Burner",
      "price": 2510,
      "status": 'available',
      "id": 5
    },
  ]
};

export default function ItemsScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(DATA.parts);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Ionicons name="ios-cart" size={24} color="black" style={{ marginRight: 10}}/>
    })
  }, [])


  const onRefresh = () => {
    console.log("refreshing ...");
  }

  return (
    <FlatList
      style={styles.container}
      data={DATA.parts}
      keyExtractor={( item ) => item.id.toString()}
      renderItem={(item) => <ListItem item={item.item} hideNext={true}/>}
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