import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text } from 'react-native';
import Chart from '../components/Chart';
import Constants from '../Constants';
import FastingChartImg from '../../Images/Fasting/main.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Constants.WIDTH,
    height: Constants.WIDTH / 1.6543,
  },
  dataImage: {
    width: Constants.WIDTH / 4,
    height: Constants.WIDTH / 4,
  },
  view: {
    flex: 1,
    width: '25%',
    borderRightWidth: 0.5,
    borderRightColor: 'white',
  },
  text: {
    fontSize: Constants.WIDTH / 8.5,
    textAlign: 'center',
    padding: 20,
  },
});

const DefaultItem = ({ main }) => <Text style={styles.text}>{main}</Text>;

const mapStateToProps = (state) => ({
  data: state.profile.profiles[state.profile.activeProfile].FastingDay,
});

const mapDispatchToProps = () => ({
  images: Constants.FASTING_CHART_IMAGES,
  mainImage: FastingChartImg,
  styles,
  navPath: 'FastingDay',
  DefaultItem,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
