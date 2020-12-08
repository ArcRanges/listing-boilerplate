import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../../constants/Colors';

const Wrapper = ({ children, isLoading = false }) => (
  <KeyboardAwareScrollView style={ styles.container }
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.container}
    scrollEnabled={true}
  >
    <StatusBar barStyle="dark-content" backgroundColor="#16a085" />
    {children}
    <Spinner visible={isLoading} />
  </KeyboardAwareScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default Wrapper;
