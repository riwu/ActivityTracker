import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

class PrayerTimes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Activitiy is not available yet</Text>
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

export default PrayerTimes;
