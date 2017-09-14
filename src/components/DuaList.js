import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import CONSTANTS from '../Constants';

class DuaList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Du a list</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DuaList;
