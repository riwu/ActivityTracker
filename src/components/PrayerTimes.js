import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import NavigationOptions from '../navigators/NavigationOptions';
import CONSTANTS from '../Constants';

class PrayerTimes extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation,
    CONSTANTS.PRAYER_TIMES);

  render() {
    return (
      <View style={styles.container}>
        <Text>Fasting chart</Text>
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
