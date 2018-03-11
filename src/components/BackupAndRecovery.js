import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import CONSTANTS from '../constants';

class BackupAndRecovery extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Backup</Text>
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

export default BackupAndRecovery;
