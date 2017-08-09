import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import FastingChartPassed from '../../Images/FastingChart/passed.png';
import FastingChartTried from '../../Images/FastingChart/tried.png';
import FastingChartFailed from '../../Images/FastingChart/failed.png';

class FastingDay extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.images}>
          <Image style={styles.image} source={FastingChartPassed} />
          <Image style={styles.image} source={FastingChartTried} />
          <Image style={styles.image} source={FastingChartFailed} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
  },
  images: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: '26%',
    height: 110,
    resizeMode: 'cover',
  },
  box: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'dotted',
  },
});

export default FastingDay;
