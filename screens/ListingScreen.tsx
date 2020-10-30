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

import {
  Paragraph,
  Subheading,
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

  const getColor = (s) => {
    if (s == 'sold') return 'silver';
    if (s == 'available') return 'lightskyblue';
    if (s == 'pending') return 'tomato';
  }

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
      <View style={{padding: 20}}>
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
              <View style={styles.listItemContainer} key={i}>
                <View>
                  <Subheading style={{ fontWeight: 'bold'}}>
                    {d.name}
                  </Subheading>
                  <Paragraph>
                    <Text style={styles.price}>${d.price}</Text>
                  </Paragraph>
                </View>
                <Button mode="contained" 
                  style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: getColor(d.status)}}
                >
                  { d.status == 'available' ? "Message" : d.status}
                </Button>
              </View>
            )
          })
        }

        <TouchableOpacity onPress={()=> console.log('pressed')}
          style={{ justifyContent: 'center', alignItems: 'center', margin: 10}}
        >
          <Text style={{ color: '#147efb'}}>VIEW MORE</Text>

        </TouchableOpacity>
      
        <Text style={styles.listTitle}>
          More from this seller
        </Text>
      </View>
      
      
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
                    onPress={()=> navigation.navigate('Listings', {data})}
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
    backgroundColor: '#fff',
    paddingBottom: 40,
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
  listItemContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
  },
  price: {
    fontWeight: 'bold',
    color: 'tomato'
  }
})
