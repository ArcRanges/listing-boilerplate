import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import ListingsScreen from '../screens/ListingsScreen';
import ListingScreen from '../screens/ListingScreen';
import ItemsScreen from '../screens/ItemsScreen';

import FavouritesScreen from '../screens/FavouritesScreen';

import MyListingsScreen from '../screens/MyListingsScreen';

import MessagesScreen from '../screens/MessagesScreen';
import MessageScreen from '../screens/MessageScreen';

import ProfileScreen from '../screens/ProfileScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: 'black', inactiveTintColor: 'lightgray', }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ focused, color }) => <TabBarIcon name="ios-home" color={focused ? 'black' : 'lightgray'} />,
          tabBarLabel: ''
        }}
        
      />
      <BottomTab.Screen
        name="Favourites"
        component={FavouritesTabNavigator}
        options={{
          tabBarIcon: ({focused, color }) => <TabBarIcon name="ios-heart" color={focused ? 'black' : 'lightgray'} />,
          tabBarLabel: ''
        }}
       
      />
      <BottomTab.Screen
        name="My Listings"
        component={MyListingsTabNavigator}
        options={{
          tabBarIcon: ({focused, color }) => <TabBarIcon name="ios-list" color={focused ? 'black' : 'lightgray'} />,
          tabBarLabel: ''
        }}
       
      />
      <BottomTab.Screen
        name="Messages"
        component={MessagesTabNavigator}
        options={{
          tabBarIcon: ({focused, color }) => <TabBarIcon name="ios-chatbubbles" color={focused ? 'black' : 'lightgray'} />,
          tabBarLabel: ''
        }}
       
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileTabNavigator}
        options={{
          tabBarIcon: ({focused, color }) => <TabBarIcon name="ios-contact" color={focused ? 'black' : 'lightgray'}  />,
          tabBarLabel: ''
        }}
       
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const headerConfig = {
  headerTintColor: 'black',
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent'
  },
}

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ 
          ...headerConfig,
          headerTitle: '', 
          headerLeft: ()=> <Ionicons name="ios-menu" color="black" size={28} style={{marginLeft: 20}}/>
        }}
      />
      <TabOneStack.Screen
        name="Listings"
        component={ListingsScreen}
        options={{
          ...headerConfig,
          headerTitle: '', 
        }}
      />
      <TabOneStack.Screen
        name="Listing"
        component={ListingScreen}
        options={{
          ...headerConfig,
          headerTitle: '', 
        }}
      />
       <TabOneStack.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          ...headerConfig,
          headerTitle: '', 
        }}
      />
    </TabOneStack.Navigator>
  );
}

const FavouritesStack = createStackNavigator();

function FavouritesTabNavigator() {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ 
          ...headerConfig,
          headerTitle: 'My Favourites' 
        }}
      />
      <FavouritesStack.Screen
        name="Listings"
        component={ListingsScreen}
        options={{
          ...headerConfig,
          headerTitle: '', 
        }}
      />
      <FavouritesStack.Screen
        name="Listing"
        component={ListingScreen}
        options={{
          ...headerConfig,
          headerTitle: '', 
        }}
      />
       <FavouritesStack.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          ...headerConfig,
          headerTitle: '', 
        }}
      />
    </FavouritesStack.Navigator>
  );
}

const MessagesStack = createStackNavigator();

function MessagesTabNavigator() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ 
          ...headerConfig,
          headerTitle: 'Messages'
        }}
      />
      <MessagesStack.Screen
        name="Message"
        component={MessageScreen}
        options={{ 
          ...headerConfig,
          headerTitle: ''
        }}
      />
    </MessagesStack.Navigator>
  );
}

const MyListingsStack = createStackNavigator();

function MyListingsTabNavigator() {
  return (
    <MyListingsStack.Navigator>
      <MyListingsStack.Screen
        name="MyListings"
        component={MyListingsScreen}
        options={{
          ...headerConfig,
          headerTitle: 'My Listings',
        }}
      />
      <MyListingsStack.Screen
        name="Listing"
        component={ListingScreen}
        options={{
          ...headerConfig,
          headerTitle: ''
        }}
      />
      <MyListingsStack.Screen
        name="Items"
        component={ItemsScreen}
        options={{
          ...headerConfig,
        }}
      />
    </MyListingsStack.Navigator>
  )
}
const ProfileStack = createStackNavigator();

function ProfileTabNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...headerConfig,
          headerTitle: '',
          headerRight: ()=> <Ionicons name="ios-settings" color="black" size={28} style={{marginRight: 20}}/>
        }}
      />
    </ProfileStack.Navigator>
  );
}
