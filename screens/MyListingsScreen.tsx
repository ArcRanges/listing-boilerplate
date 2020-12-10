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

export default function MyListingsScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  function onAuthStateChanged(user) {
    if (user) {
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
        snapshot.forEach((snapshotValue) => {
          // console.log(item.val());
          const value = snapshotValue.val();
          if (value.status == 'active') {
            const { year, make, model, images, description } = snapshotValue.val();
            let title = year + " " + make + " " + model;
            newData.push({
              title,
              images,
              description,
              _id: snapshotValue.key, 
              item: value
            })
          }
         
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
              item={data.item}
              itemKey={data._id}
              user={user}
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
