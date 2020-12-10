import React , {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, Text, View, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';

import {
  Avatar,
  Subheading,
  Paragraph
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { AuthContext } from '../hooks/authContext';

import firebase from '../firebase/Fire';

import Wrapper from './shared/Wrapper';

import { CardPlaceholder } from '../components/Card';

import {
  Placeholder,
  PlaceholderLine,
  Shine,
} from "rn-placeholder";

const LoadingProfile = () => {
  return (
    <Placeholder
      Animation={Shine}>

      <View style={styles.box1}>
        <PlaceholderLine style={{ width: 128, height: 128, borderRadius: 64}}/>
        <PlaceholderLine width={25} style={{ height: 20}}/>
        <PlaceholderLine width={25} style={{ height: 20}}/>
        <PlaceholderLine width={25} style={{ height: 20}}/>
      </View>
      <View style={[styles.box1,{marginTop: 35}]}>
        <PlaceholderLine width={100} style={[styles.bannerStyle, {position: 'relative'}]}/>
        <View style={styles.statsContainer}>
           
        </View>
      </View>
      <View style={{marginLeft: 20}}>
        <PlaceholderLine width={25} style={{ height: 20}}/>
      </View>
      <View style={styles.placeholderCardsStyle}>
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
     
    </Placeholder>
  )

}

const ListItem = ({item}) => {
  return(
    <View style={styles.listItemContainer}>
      <View style={[styles.box1, {flexDirection: 'row'}]}>
        <Avatar.Image size={48} source={{uri: 'https://picsum.photos/64/64'}} style={{ marginRight: 10}} />
        <View>
          <Subheading style={{ fontWeight: 'bold'}}>
            {item.name}
          </Subheading>
          <Paragraph>
            <Text style={styles.comment}>{item.comment}</Text>
          </Paragraph>
        </View>
        
      </View>
    </View>
  );
}

export default function ProfileScreen({navigation}) {
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(false)

  const { signOut } = React.useContext(AuthContext);

  const onRefresh = () => {
    setLoading(true);
    fetchUserData(user)
    setTimeout(()=> {
      setLoading(false);
    }, 2000)
  }

  const fetchUserData = async (user) => {
    await firebase
      .database()
      .ref('users/' + user.uid)
      .once('value')
      .then((snapshot)=> {
        let data = snapshot.val();
        setUserData(data)
      });
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    setLoading(true)
    if (user) {
      fetchUserData(user);
      setUser(user);
      setLoading(false)
    }

  }
  
  const logout = () => {
    setLoading(true);
    signOut();
  }

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: logout }
      ],
      { cancelable: false }
    );

    
  }

  useEffect(()=> {
    navigation.setOptions({
      headerRight: ()=> 
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="ios-log-out" color="black" size={28} style={{marginRight: 20}}/>
        </TouchableOpacity>
    })
    const unsubscribe = navigation.addListener('focus', () => {
      const subscriber = firebase.auth()
      .onAuthStateChanged(onAuthStateChanged);
      // console.log("listening ...")
      // fetchData();
    });

    return unsubscribe
  }, [loading, user, userData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingProfile/>
      </View>
      
    )
  }

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: 'white'}}
      contentContainerStyle={styles.container}>

      <View style={styles.box1}>
        <Avatar.Image size={128} source={{uri: 'https://picsum.photos/128/128'}} />
        <Text style={styles.title}>Mark Ranges</Text>
        <Text style={styles.subtitle}>CEO | App Developer</Text>
        <Text style={styles.location}>Vancouver, BC</Text>
      </View>
      <View style={[styles.box1,{marginTop: 35}]}>
        <View style={styles.bannerStyle}>
          
        </View>
        <View style={styles.statsContainer}>
            <View>
              <Text style={[styles.title, {marginTop: 0, color: 'tomato'}]}>{userData && Object.entries(userData.listings).length || 0}</Text>
              <Text style={styles.subtitle}>Listings</Text>
            </View>
            {/* <View>
              <Text style={[styles.title, {marginTop: 0, color: 'tomato'}]}>25</Text>
              <Text style={styles.subtitle}>Parts Sold</Text>
            </View>
            <View>
              <Text style={[styles.title, {marginTop: 0, color: 'tomato'}]}>3</Text>
              <Text style={styles.subtitle}>Ratings</Text>
            </View> */}
          </View>
      </View>
      <View style={{marginTop: 35, marginLeft: 20}}>
        <Text style={[styles.title, {textAlign: 'left'}]}>
          Recent Ratings
        </Text>
      
      </View>
      <View>
        {[1,2,3,4,5].map((v, i)=> {
          return <ListItem key={i}
            item={{name: "Robert M.", comment: "Very funny guy lol"}}
          />
        })}
        
      </View>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 20
  },
  box1: {
    alignItems: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10
  },
  location:{
    color: 'darkgray',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10
  },
  bannerStyle: {
    backgroundColor: '#fafafa',
    width: '100%',
    position: 'absolute',
    left: '5%',
    height: 100,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  statsContainer: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },
  listItemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: 20,
  },
  comment: {
    fontWeight: 'normal',
    color: 'darkgray'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  placeholderCardsStyle: {
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
});
