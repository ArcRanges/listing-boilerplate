import React, {useState, useEffect} from 'react';
import { 
  ScrollView, 
  View,
  Text, 
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatListSlider} from 'react-native-flatlist-slider';
import ActionButton from 'react-native-action-button';
import call from 'react-native-phone-call';
import { showMessage } from "react-native-flash-message";

import firebase from '../firebase/Fire';

import Card, {CardPlaceholder} from '../components/Card';
import CustomImage from '../components/CustomImage';

import {
  Paragraph,
} from 'react-native-paper';

import ImageView from "react-native-image-viewing";

export const convertImages = (imgs) => {
  let arr = [];
  imgs.map((img, i)=> {
    arr.push({
      image: img,
      desc: 'Silent Waters in the mountains in midst of Himilayas'
    })
  });
  // console.log(arr); 
  return arr
}

export const convertToZoomImages = (imgs) => {
  let arr = [];
  imgs.map((img, i)=> {
    arr.push({
      uri: img,
      index: i
    })
  });
  // console.log(arr); 
  return arr
}
export default function ListingScreen({navigation, route}) {
  const listingData = route.params.data;
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false);
  const [isFavourite, setFavourite] = useState(false)
  const [data, setData] = useState(listingData);
  const [images, setImages] = useState([])
  const [zoomImages, setZoomImages] = useState([])
  const [isVisible, setModalVisible] = useState(false)

  function onAuthStateChanged(user) {
    if (user) {
      // console.log(listingData);
      setLoading(true)
      firebase
        .database()
        .ref('users/' + user.uid)
        .once('value')
        .then((snapshot)=> {
          // console.log();
          let userData = snapshot.val()
          if (userData.favourites != undefined) {
            let isFavourited = userData.favourites[listingData._id] || false;
            setFavourite(isFavourited)
          }
          setLoading(false);

          setUser(user);
        })
        .catch((err) => {
          console.warn(err)
        })
    }

    if (loading) {
      setLoading(false)
    };
  }

  const updateUserFavourites = (isFavourited) => {
    if (user) {
      firebase.database().ref('users/' + user.uid).once('value').then((snapshot => {
        let favourites = {}
        favourites[listingData._id] = isFavourited
        firebase.database().ref('users/' + user.uid + '/favourites').update(favourites)
      }));
    }
  }

  const addToFavourites = () => {
    
    if (isFavourite) {
      setFavourite(false);
      updateUserFavourites(false)
      showMessage({
        message: "Oh no!",
        description: "This listing has been removed from your favourites.",
        type: "warning",
      });
    } else {
      setFavourite(true);
      updateUserFavourites(true)
      showMessage({
        message: "Success!",
        description: "This listing has been added to your favourites.",
        type: "success",
      });
    }
  }

  const visitUser = (id) => {
    navigation.navigate("Profile", {id})
  }

  useEffect(() => {
    if (listingData.images) {
      const images = convertImages(listingData.images)
      const zoomImages = convertToZoomImages(listingData.images)
      setImages(images);
      setZoomImages(zoomImages)
    }
   
    
    navigation.setOptions({
      headerRight: ()=> 
        <TouchableOpacity onPress={()=> visitUser(1)}>
          <Icon name="ios-contact" style={{ color: 'black', fontSize: 28, marginRight: 15}} />
        </TouchableOpacity>
    });

    const unsubscribe = navigation.addListener('focus', () => {
      const subscriber = firebase.auth()
      .onAuthStateChanged(onAuthStateChanged);
      
    });

    return unsubscribe
  }, [isFavourite, user, ])

  const openCallWindow = () => {
    let phone = '6041112231';
    const args = {
      number: phone, // String value with the number to call
      prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch(console.error)
  }

  const onRefresh = () => {
    // console.log('refreshing...');
    // fetchData();
    setLoading(true);
    setTimeout(()=> {
      setLoading(false)
    },1500)
  }
  // if (images.length === 0) {
  //   return <Text>Loading ...</Text>
  // }
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.listingBox, {borderWidth: 1, borderColor: 'lightgray'}]}>
          <CardPlaceholder/>
        </View>
      </View>
    )
  }
  return (
    <View style={{flex: 1}}>
      <ImageView
        images={zoomImages}
        imageIndex={0}
        visible={isVisible}
        onRequestClose={() => setModalVisible(false)}
      />
      <ActionButton 
        style={{zIndex: 2}} 
        onPress={openCallWindow}
        renderIcon={()=> <Icon name="ios-call" style={styles.actionButtonIcon} />}
        buttonColor="#147efb"
      >
      </ActionButton>
      <ScrollView contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl 
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        {images && images.length > 0 &&
          <FlatListSlider
            autoScroll={false}
            timer={10000}
            data={images}
            width={275}
            onPress={() => setModalVisible(isVisible => !isVisible)}
            contentContainerStyle={{paddingHorizontal: 16}}
            component={<CustomImage/>}
            indicatorActiveWidth={40}
          />
        }
        
       
        <View style={styles.descriptionContainerStyle}>
          <View style={styles.listingInfoBox}>
            <View style={styles.pricingBox}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 28}}>
                $2050 <Text style={{textDecorationLine: 'line-through', color: 'darkgray'}}>$3000</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={addToFavourites} style={[styles.addToFavourites, {borderColor: isFavourite ? 'lightcoral' :'black'}]}>
              <Icon name={isFavourite ? "ios-heart" : "ios-heart-empty"} style={{ color: isFavourite ? 'lightcoral' :'black', fontSize: 28}} />
            </TouchableOpacity>
           
          </View>
          {/* <View style={styles.sellerContainer}>
            <Avatar.Image size={64} source={{uri: 'https://picsum.photos/64/64'}} />
            <View style={{marginLeft: 15}}>
              <Text style={styles.listTitle}>
                Brian M.
              </Text>
              <Paragraph>
                Vancouver, BC
              </Paragraph>
            </View>
          </View> */}
         

          <Text style={styles.listTitle}>
            {data.title}
          </Text>
          <Paragraph>
            Posted 2 days ago
          </Paragraph>

          <Text style={styles.listTitle}>
            Short Description
          </Text>
          <Paragraph>
            {data.description}
          </Paragraph>
          
          <Text style={styles.listTitle}>
            Parts Available
          </Text>
          
          {
            // DATA[0].parts.map((d, i)=> {
            //   return (
            //     <ListItem item={d} key={i} hideAdd={true}/>
            //   )
            // })
          }

          <TouchableOpacity onPress={()=> navigation.navigate('Items', {})}
            style={{ justifyContent: 'center', alignItems: 'center', margin: 10}}>
            <Text style={{ color: 'black', fontWeight: 'bold'}}>VIEW MORE</Text>
          </TouchableOpacity>
        </View>
        
        <View style={{ paddingLeft: 20}}>
          <Text style={styles.listTitle}>
            More from this seller
          </Text>
        </View>
        
        <View style={styles.listingContainer}>
          {
          // data.map((data, index)=> {
          //   return (
          //     <Card key={index} data={data} navigation={navigation}/>
          //   )
          // })
          }
        </View>
        
      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  listingInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sellerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pricingBox: { 
    backgroundColor: 'gold', 
    borderRadius: 15, 
    width: '75%', 
    padding: 15
  },
  addToFavourites: { 
    backgroundColor: '#fafafa', 
    borderRadius: 15, 
    width: '20%', 
    padding: 15, 
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  descriptionContainerStyle: {
    // padding: 20,
    // borderColor: 'black',
    // borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    margin: 15
  },
  image: {
    height: 230,
    resizeMode: 'stretch',
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
    height: 250,

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
  actionButtonIcon: {
    fontSize: 26,
    height: 26,
    color: 'white',
  },
})
