import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const PlayerList = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18}}>Player List</Text>
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
export default PlayerList;
