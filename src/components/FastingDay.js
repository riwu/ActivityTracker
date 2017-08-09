import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import FastingChartPassed from '../../Images/FastingChart/passed.png';
import FastingChartTried from '../../Images/FastingChart/tried.png';
import FastingChartFailed from '../../Images/FastingChart/failed.png';

class FastingDay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={FastingChartPassed} />
        <Image style={styles.image} source={FastingChartTried} />
        <Image style={styles.image} source={FastingChartFailed} />

        <Text>Detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: '25%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FastingDay;
