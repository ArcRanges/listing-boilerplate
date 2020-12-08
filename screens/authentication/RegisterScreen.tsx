import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { showMessage } from 'react-native-flash-message';
import { Title, Paragraph, Avatar, Button } from 'react-native-paper';

import SubmitButton from '../shared/Button';
import TextInput from '../shared/TextInput';
import IconTitleSet from '../shared/IconTitleSet';
import Wrapper from '../shared/Wrapper';

import validateForm from '../../helpers/validation';

import { AuthContext } from '../../hooks/authContext';

export default function Register({route, navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputEmail = useRef(null);
  const inputName = useRef(null);
  const inputPassword = useRef(null);
  const inputPasswordConfirmation = useRef(null);

  const { signUp } = React.useContext(AuthContext);

  const onSubmitRegistration = () => {

    const isFormValid = runValidation();
    if (!isFormValid) {
      console.log("invalid form");

      return;
    }

    setIsLoading(true);

    signUp({ email, password, name });
  }

  const runValidation = () => {
    const fields = [
      {
        value: name,
        verify: [{
          type: 'isPopulated',
          message: 'Please enter your name',
        }],
      },
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
          {
            type: 'isMatched',
            matchValue: passwordConfirmation,
            message: 'Password and Confirmation must match',
          },
          {
            type: 'isGreaterThanLength',
            length: 5,
            message: 'Password must be at least six characters',
          },
        ],
      },
      {
        value: passwordConfirmation,
        verify: [{
          type: 'isPopulated',
          message: 'Please confirm your password',
        }],
      },
    ];

    const errorMessage = validateForm(fields);
    console.log(errorMessage);
    
    if (errorMessage) {
      showMessage({
        message: 'Please correct the following error(s)',
        description: errorMessage,
        type: 'danger',
      });

      return false;
    }

    return true;
  }

  return (
    <ImageBackground source={require('../../assets/images/register-bg.png')} style={{ width: '100%', height: '100%'}}>
      <Wrapper isLoading={isLoading}>
        <View style={styles.container}>
          {/* <Avatar.Image size={100} source={{ uri: 'https://placeimg.com/100/100/any' }} style={{ alignSelf: 'center', marginBottom: 10}}/> 
          <Title style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 15}}> CREATE A NEW ACCOUNT </Title>*/}

          
          <KeyboardAvoidingView
            keyboardVerticalOffset={40}
            behavior={"position"}
            style={styles.signupFormContainer}
          >
            <Image source={require('../../assets/images/logo-white-trans.png')} style={{height: 150, width: "100%", resizeMode: 'contain'}}/>
            <TextInput
              value={name}
              onChangeText={name => setName(name)}
              placeholder="Name"
              ref={inputName}
              onSubmitEditing={() => inputEmail.current.focus()}
              style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff'}}
            />
            <TextInput
              value={email}
              onChangeText={email => setEmail(email)}
              ref={inputEmail}
              onSubmitEditing={() => inputPassword.current.focus()}
              keyboardType="email-address"
              placeholder="Email Address"
              style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff'}}
            />
            <TextInput
              value={password}
              onChangeText={password => setPassword(password)}
              placeholder="Password"
              secureTextEntry
              ref={inputPassword}
              onSubmitEditing={() => inputPasswordConfirmation.current.focus()}
              style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff'}}
            />
            <TextInput
              value={passwordConfirmation}
              onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}
              placeholder="Confirm Password"
              secureTextEntry
              returnKeyType="go"
              ref={inputPasswordConfirmation}
              onSubmitEditing={onSubmitRegistration}
              style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: '#fff'}}
            />
          </KeyboardAvoidingView>
          <SubmitButton onPress={onSubmitRegistration}>SUBMIT</SubmitButton>

          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'lightgray'}}>Already registered?
              
              {/* <Button
                mode="text"
                color="white"
                
                disabled={isLoading}
              >
              {isLoading ? <ActivityIndicator size={18} color="white"/> :}
              </Button> */}
            </Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
              <Text style={{color: 'white', fontWeight: 'bold'}}> Login</Text>
            </TouchableOpacity>
          </View>
          {/* <Button
            mode="text"
            color="black"
            style={{backgroundColor: '#fefefe', padding: 5,}}
            onPress={()=> navigation.navigate('Login')}
          >
          Already have an account
          </Button> */}
        </View>
      </Wrapper>
    </ImageBackground>
    
  );

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 15,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  iconTitleSet: {
    marginBottom: 20,
  },
});
