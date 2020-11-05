import React, {useState} from 'react';
import { 
  ScrollView, 
  View,
  Text, 
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import {FlatListSlider} from 'react-native-flatlist-slider';

import Card from '../components/Card';

import {
  Paragraph,
} from 'react-native-paper';

import ListItem from '../components/ListItem';

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
          "name": "Rear View Mirror",
          "price": 300,
          "status": 'sold'
        },
        {
          "name": "Subwoofer",
          "price": 100,
          "status": 'available'
        },
        {
          "name": "Spoiler",
          "price": 250,
          "status": 'pending'
        },
      ]
    },
    {
      "id": 2,
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
          "status": 'sold'
        },
        {
          "name": "Subwoofer",
          "price": 100,
          "status": 'available'
        },
        {
          "name": "Spoiler",
          "price": 250,
          "status": 'pending'
        },
      ]},
      {
        "id": 3,
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
            "status": 'sold'
          },
          {
            "name": "Subwoofer",
            "price": 100,
            "status": 'available'
          },
          {
            "name": "Spoiler",
            "price": 250,
            "status": 'pending'
          },
        ]
      },
      {
        "id": 4,
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
            "status": 'sold'
          },
          {
            "name": "Subwoofer",
            "price": 100,
            "status": 'available'
          },
          {
            "name": "Spoiler",
            "price": 250,
            "status": 'pending'
          },
        ]
      }
  ]
const images = [
  {
    image:'https://upload.wikimedia.org/wikipedia/commons/a/a8/2nd_Acura_CL.jpg',
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  {
    image:'https://upload.wikimedia.org/wikipedia/commons/b/b4/1998-1999_Acura_CL_--_04-11-2012_2.JPG',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:'https://media.ed.edmunds-media.com/acura/cl/2003/oem/2003_acura_cl_coupe_32_fq_oem_2_500.jpg',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
 ]
export default function ListingScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(DATA);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatListSlider
        autoScroll={false}
        timer={10000}
        data={images}
        contentContainerStyle={{ borderRadius: 25}}
        indicatorContainerStyle={{ bottom: 10, right: 10, position: 'absolute'}}
        indicatorActiveColor="white"
        indicatorInActiveColor="lightgray"
      />
      <View style={styles.descriptionContainerStyle}>
        <Text style={styles.listTitle}>
          Acura CL 2010
        </Text>
        <Paragraph>
          Posted 2 days ago from Vancouver, BC
        </Paragraph>
        <Text style={styles.listTitle}>
          Parts Listed
        </Text>

        {
          DATA[0].parts.map((d, i)=> {
            return (
              <ListItem item={d} key={i} hideAdd={true}/>
            )
          })
        }

        <TouchableOpacity onPress={()=> navigation.navigate('Items', {})}
          style={{ justifyContent: 'center', alignItems: 'center', margin: 10}}
        >
          <Text style={{ color: 'black', fontWeight: 'bold'}}>VIEW MORE</Text>

        </TouchableOpacity>
      
       
      </View>
      
      <View style={{ paddingLeft: 20}}>
        <Text style={styles.listTitle}>
          More from this seller
        </Text>
      </View>
      
      <View style={styles.listingContainer}>
        {data.map((data, index)=> {
          return (
            <Card key={index} data={data} navigation={navigation}/>
          )
        })}
      </View>
       
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  descriptionContainerStyle: {
    // padding: 20,
    // borderColor: 'black',
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 15
  },
  imageStyle: {
    height: 250,
    borderRadius: 15,
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
    height: 225,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.23,
    shadowRadius: 1, 

    elevation: 1,
  },
  listTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 22
  },
})
