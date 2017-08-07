import React, { Component } from 'react';
import { View, StyleSheet, Platform, NativeModules } from 'react-native';

const { StatusBarManager } = NativeModules;

class StatusBarBackground extends Component {
  render() {
    return (
      <View style={[styles.statusBarBackground, this.props.style || {}]} />
    );
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 20 : StatusBarManager.HEIGHT,
    backgroundColor: 'white',
  },
});

export default StatusBarBackground;
