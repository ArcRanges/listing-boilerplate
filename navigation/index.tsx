import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import LoginScreen from '../screens/authentication/LoginScreen';
import RegisterScreen from '../screens/authentication/RegisterScreen';

import firebase from '../firebase/Fire';
import {AuthContext} from '../hooks/authContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { showMessage } from 'react-native-flash-message';
// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (isLoading) {
      setIsLoading(false)
    };
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    
    return subscriber;
  }, []);

  const authContext = React.useMemo(
    () => ({
      getState: async () => {
        // dispatch({ type: 'GET_STATE' });
        return state
      },
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token



        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      signOut: () => {
        setTimeout(()=> {
          firebase.auth().signOut().then(function() {
            console.log("signing out ...");
            
            dispatch({ type: 'SIGN_OUT' });
          }).catch(function(error) {
            // An error happened.
          });
        }, 999)

      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(({ user }) => {
            // Add the new user to the users table
            firebase.database().ref()
              .child('users/' + user.uid)
              .set({
                email: data.email,
                uid: user.uid,
                name: data.name,
                // photoURL: getGravatarSrc(data.email),
                // droplets: 0,
              });

            // Update the user's metadata on firebase
            user.updateProfile({
              displayName: data.name,
              // photoURL: getGravatarSrc(data.email),
            });
            // this.setState({ isLoading: false });
            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          })
          .catch((error) => {
            showMessage({
              message: 'Registration Failed',
              description: `${error.message} (${error.code})`,
              type: 'danger',
            });
          });


      },
    }),
    []
  );

  if (isLoading) {
    <Spinner
      visible={isLoading}
    />
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {
          user == null ?
            <AuthenticationNavigation/> : <RootNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function AuthenticationNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} mode="modal"/>
      <Stack.Screen name="Register" component={RegisterScreen} mode="modal"/>
    </Stack.Navigator>
  );
}