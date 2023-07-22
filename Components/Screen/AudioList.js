import {Text, View, StyleSheet, ScrollView} from 'react-native';
import React, {Component} from 'react';
// import {AudioContext} from '../Context/AudioProvider';

const AudioList = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18}}>Audio List</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default AudioList;
