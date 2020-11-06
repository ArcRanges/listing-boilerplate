import React, {useEffect, useCallback, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { 
  GiftedChat, 
  Bubble,
  Actions,
  ActionsProps,
  Time
} from 'react-native-gifted-chat'

export default function MessageScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Arc',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const renderBubble = (props) => {
    let chatStyle = {
      borderColor: 'black',
      borderWidth: 1,
    }
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'black',
            padding: 5,
          },
        }}
        renderTime={()=>
          <Time currentMessage={props.currentMessage} timeTextStyle={{
            left: {
              color: 'darkgray'
            },
            right: {
              color: 'darkgray'
            }
          }}/>
        }
        wrapperStyle={{
          left: {
            ...chatStyle,
            padding: 5,
            backgroundColor: '#fff',
          },
          right: {
            ...chatStyle,
            backgroundColor: 'white',
            color: 'black'
          }
        }}
      />
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function renderActions(props: Readonly<ActionsProps>) {
    // need permissions for images
    // if (!isPermissionGranted) {
    //   return null
    // }

    return (
      <Actions
        {...props}
        options={{
          'Select Photo from Library': pickImage,
          Cancel: () => {},
        }}
        icon={() => (
          <Ionicons color="#194161" name="ios-camera" size={28}/>
        )}
        onSend={args => console.log(args)}
      />
    )
  }

  return (
    <GiftedChat
      messagesContainerStyle={{
        backgroundColor: 'white'
      }}
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      renderActions={renderActions}
      onPressAvatar={(user)=> navigation.navigate('Profile', {user})}
      showUserAvatar={true}
      user={{
        _id: 1,
        name: "TEST",
        avatar: 'https://placeimg.com/140/140/any'
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
