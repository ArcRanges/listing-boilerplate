import React, {useState} from 'react'
import { 
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';

import {
  Card,
  Title,
  Paragraph,
  Button,
  IconButton
} from 'react-native-paper';

const DATA = [
  {
    "id": 1,
    "title": "Acura 2019 TLX",
    "img_url": "https://static.cargurus.com/images/article/2017/05/10/15/27/2018_acura_tlx_preview_overview-pic-7309079428147800010-200x200.jpeg",
    "location": {
      "city": "Vancouver",
      "province": "BC"
    },
    "parts": [
      {
        "name": "rear view",
        "price": 100,
        "available": true
      },
      {
        "name": "side mirror",
        "price": 20,
        "available": false
      },
      {
        "name": "spoiler",
        "price": 5,
        "available": true
      },
    ]
  },
  {
    "id": 2,
    "title": "Acura 2010 LSX",
    "img_url": "https://media.ed.edmunds-media.com/acura/tsx/2010/oem/2010_acura_tsx_sedan_base_fq_oem_1_500.jpg",
    "location": {
      "city": "Vancouver",
      "province": "BC"
    },
    "parts": [
      {
        "name": "rear view",
        "price": 25,
        "available": true
      },
      {
        "name": "side mirror",
        "price": 25,
        "available": false
      },
      {
        "name": "spoiler",
        "price": 35,
        "available": true
      },
    ]
  },
  {
    "id": 3,
    "title": "BMW X5 2020",
    "img_url": "https://images.hgmsites.net/lrg/2020-bmw-x5-competition-sports-activity-vehicle-angular-front-exterior-view_100766015_l.jpg",
    "location": {
      "city": "Vancouver",
      "province": "BC"
    },
    "parts": [
      {
        "name": "rear view",
        "price": 100,
        "available": true
      },
      {
        "name": "side mirror",
        "price": 20,
        "available": false
      },
      {
        "name": "spoiler",
        "price": 5,
        "available": true
      },
    ]
  },
  {
    "id": 4,
    "title": "Acura 2010 LSX",
    "img_url": "https://media.ed.edmunds-media.com/acura/tsx/2010/oem/2010_acura_tsx_sedan_base_fq_oem_1_500.jpg",
    "location": {
      "city": "Vancouver",
      "province": "BC"
    },
    "parts": [
      {
        "name": "rear view",
        "price": 25,
        "available": true
      },
      {
        "name": "side mirror",
        "price": 25,
        "available": false
      },
      {
        "name": "spoiler",
        "price": 35,
        "available": true
      },
    ]
  }
]

export default function ListingsScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(DATA);

  const onRefresh = () => {
    console.log('refreshing...');
    
  }

  return (
    <ScrollView
    style={styles.container}
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={onRefresh} />
    }>
      <View style={styles.listingContainer}>
        {data.map((data, index)=> {
          return (
          
              <View  key={index}  style={styles.listingBox}>
                <Image source={{ uri: data.img_url}} 
                  resizeMode={'cover'} 
                  style={{ height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                />
                <View style={{ alignItems: 'flex-start', padding: 10}}>
                  <Text style={{ color: 'rgba(0,0,0,1)', fontSize: 16, fontWeight: 'bold'}}>{data.title}</Text>
                  <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 12}}>{`${data.location.city}, ${data.location.province}`}</Text>
                  {/* <Text style={{ color: 'rgba(0,0,0,0.5)', fontSize: 12, fontStyle: 'italic'}}>Posted 2 days ago in </Text> */}
                  <TouchableOpacity  style={{ marginLeft: 'auto', marginRight: 5}}
                   onPress={()=> navigation.navigate('Listing', {data})}
                  >
                    <Text style={{ color: '#147efb' }}>View</Text>
                  </TouchableOpacity>
                  
                </View>
              </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listingContainer: {
    flex: 1,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  listingBox: { 
    width: '45%', 
    margin: 5, 
    padding: 0, 
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 225
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.23,
    shadowRadius: 1, 

    elevation: 1,
  }
})
