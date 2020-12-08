import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
// This needs to be a class so that the refs that are potentially applied to this component will work
/* eslint react/prefer-stateless-function: 0 */
// https://stackoverflow.com/a/35900548/83916
class ChatTextInput extends Component {
  render() {
    const {
      mode='outlined',
      placeholder = '',
      style,
      returnKeyType = 'next',
      onSubmitEditing,
      keyboardType = 'default',
      autoCapitalize = 'none',
      autoCorrect = false,
      value,
      onChangeText,
      secureTextEntry = false,
      editable= true
    } = this.props;
    return (
      <TextInput
        underlineColor={'transparent'}
        selectionColor={'black'}
        theme={{ colors: { primary: 'transparent',}}}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.75)"
        style={[styles.input, style]}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
        textContentType="oneTimeCode"
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#4f4e4e',
    paddingHorizontal: 10,
    borderRadius: 5
  },
});

export default ChatTextInput;
