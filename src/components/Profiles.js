import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.props.navigation.navigate('Detail')} title="CREATE PROFILE" />
        <Button title="USE PROFILE" onPress={() => this.props.navigation.navigate('Detail')} />
        <Button title="REMOVE PROFILE" onPress={() => this.props.navigation.navigate('Detail')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
