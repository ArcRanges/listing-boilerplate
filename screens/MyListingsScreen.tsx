import React, {useState, useEffect} from 'react'
import { 
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native';


import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';

import firebase from '../firebase/Fire';

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

export default function MyListingsScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  function onAuthStateChanged(user) {
    if (user) {
      // console.log("fetching data for ", user.uid);
      
      // firebase
      //   .database()
      //   .ref('users/' + user.uid)
      //   .once('value')
      //   .then((snapshot)=> {
      //     let listings = snapshot.val().listings
      //     if (listings != undefined) {
      //       fetchData(listings);
      //     }
      //   })
      //   .catch((err) => {
      //     console.warn(err)
      //   })
      fetchData(user)
      setUser(user);
    }

    if (loading) {
      setLoading(false)
    };
  }

  const fetchData =  async (user) => {
    console.log("fetching for new data ...");
    
    setLoading(true)
    setTimeout(()=> {
      firebase.database()
      .ref('/listings/')
      .orderByChild('_createdBy')
      .equalTo(user.uid)
      .once('value')
      .then((snapshot)=> {
        let newData = [];
        snapshot.forEach((item) => {
          // console.log(item.val());
          const { year, make, model, images, description } = item.val();
          let title = year + " " + make + " " + model;
          newData.push({title, images, description, _id: item.key})
        })
        setLoading(false)
        setData(newData)
      })
    }, 999)
    
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: ()=> 
        <TouchableOpacity onPress={()=> navigation.navigate("AddListing", {user})}>
          <Ionicons name="ios-add" color="black" size={28} style={{marginRight: 20}}/>
        </TouchableOpacity>
    })

    const unsubscribe = navigation.addListener('focus', () => {
      const subscriber = firebase.auth()
      .onAuthStateChanged(onAuthStateChanged);
    });

    return unsubscribe
  }, [user])

  const onRefresh = () => {
    console.log('refreshing...');
    // fetchData();
    onAuthStateChanged(user)
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
            <Card 
              key={index} 
              data={data} 
              navigation={navigation}
              isAllowedEditing={true}
            />
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
