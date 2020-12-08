import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import firebase from '../../firebase/Fire';

import { showMessage } from 'react-native-flash-message';
import { Title, Paragraph, Avatar, Button } from 'react-native-paper';

import LoginButton from '../shared/Button';
import TextInput from '../shared/TextInput';
import IconTitleSet from '../shared/IconTitleSet';
import Wrapper from '../shared/Wrapper';


import validateForm from '../../helpers/validation';
import { getGravatarSrc } from '../../helpers';

import {AuthContext} from '../../hooks/authContext';

export default function Login({route, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputPassword = useRef(null);

  const { signIn, getState } = React.useContext(AuthContext);

  const onLoginPress = async () => {

    const isFormValid = runValidation();
    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    setTimeout(()=> {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        showMessage({
          message: 'Login Failed.',
          description: `${error.message} (${error.code})`,
          type: 'danger',
        });
        setIsLoading(false);
      });
    }, 1750)
    


  }

  const runValidation = () => {
    const fields = [
      {
        value: email,
        verify: [
          {
            type: 'isPopulated',
            message: 'Please enter your email address',
          },
          {
            type: 'isEmail',
            message: 'Please format your email address correctly',
          },
        ],
      },
      {
        value: password,
        verify: [
          {
            type: 'isPopulated',
            message: 'Please enter your password',
          },
        ],
      },
    ];

    const errorMessage = validateForm(fields);
    if (errorMessage) {
      showMessage({
        message: 'Sign in failed.',
        description: errorMessage,
        type: 'danger',
      });
      return false;
    }
    return true;
  }

  return (
    <ImageBackground source={require('../../assets/images/login-bg.png')} style={{ width: '100%', height: '100%'}}>
      <Wrapper isLoading={isLoading}>
        <View style={styles.container}>
          
          <View style={styles.inner}>
            {/* <Avatar.Image size={100} source={{ uri: 'https://placeimg.com/100/100/any' }} style={{ alignSelf: 'center', marginBottom: 10}}/> */}
            <Image source={require('../../assets/images/logo-white-trans.png')} style={{height: 150, width: "100%", resizeMode: 'contain'}}/>
            <KeyboardAvoidingView
              keyboardVerticalOffset={40}
              behavior={"position"}
              style={styles.signupFormContainer}
            >
              <TextInput
                placeholder="Email Address"
                onSubmitEditing={() => inputPassword.current.focus()}
                keyboardType="email-address"
                value={email}
                onChangeText={email => setEmail(email)}
                style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff'}}
              />
              <TextInput
                placeholder="Password"
                returnKeyType="go"
                secureTextEntry
                ref={inputPassword}
                value={password}
                onChangeText={password => setPassword(password)}
                style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff'}}
              />

            </KeyboardAvoidingView>
            <LoginButton onPress={onLoginPress}>SIGN IN</LoginButton>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'lightgray'}}>Don't have an account yet?
                
                {/* <Button
                  mode="text"
                  color="white"
                  
                  disabled={isLoading}
                >
                {isLoading ? <ActivityIndicator size={18} color="white"/> :}
                </Button> */}
              </Text>
              <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                <Text style={{color: 'white', fontWeight: 'bold'}}> Register</Text>
              </TouchableOpacity>
            </View>
            
            
          </View>
        </View>

      </Wrapper>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  iconTitleSet: {
    marginBottom: 20,
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
