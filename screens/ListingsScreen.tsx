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

import Card, {CardPlaceholder} from '../components/Card';

import firebase from '../firebase/Fire';

export default function ListingsScreen({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const brandData = route.params.data;

  const fetchData =  async() => {
    console.log("fetching for new data ...");
    console.log("brandName", brandData.name);
    
    firebase.database()
      .ref('/listings/')
      .orderByChild('make')
      .equalTo(brandData.name)
      .once('value')
      .then((snapshot)=> {
        let newData = [];
        snapshot.forEach((item) => {
          let key = item.key;
          const { year, make, model, images, description } = item.val();
          let value = item.val();
          let title = year + " " + make + " " + model;
          newData.push({title, images, description, _id: key})
        })
        
        setData(newData)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = () => {
    console.log('refreshing...');
    fetchData();
  }
  if (loading) {
    return (
      <View style={[styles.listingContainer, {backgroundColor: '#fff'}]}>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
      </View>
    )
  }
  return (
    <ScrollView
    style={styles.container}
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={onRefresh} />
    }>
      { !loading ? 
        <View style={styles.listingContainer}>
        {data.map((data, index)=> {
          return (
            <Card key={index} 
              data={data} 
              navigation={navigation} 
              isAllowedEditing={false}
            />
          )
        })}
      </View> :
      <View style={styles.listingContainer}>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
      </View>
    }
      
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
    height: 250
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.23,
    shadowRadius: 1, 

    elevation: 1,
  }
})
