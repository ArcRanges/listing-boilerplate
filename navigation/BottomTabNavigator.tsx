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

import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: 'black' }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={'black'} />,
        }}
        
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={'black'} />,
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

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
