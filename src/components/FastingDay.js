import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import FastingChartPassed from '../../Images/FastingChart/passed.png';
import FastingChartTried from '../../Images/FastingChart/tried.png';
import FastingChartFailed from '../../Images/FastingChart/failed.png';

class FastingDay extends Component {
  render() {
    return (
      <View>
        <View style={styles.images}>
          <Image style={styles.image} source={FastingChartPassed} />
          <Image style={styles.image} source={FastingChartTried} />
          <Image style={styles.image} source={FastingChartFailed} />
        </View>
        <View style={styles.container}><View style={styles.box} /></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  images: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: '25%',
    height: 110,
    resizeMode: 'cover',
  },
  box: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 0.001,
    marginTop: 250,
  },
});

export default FastingDay;
