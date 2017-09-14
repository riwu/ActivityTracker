import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image } from 'react-native';
import Chart from '../components/Chart';
import { updateSurahChart } from '../actions';
import Constants from '../Constants';
import SurahChartImg from '../../Images/Surah/main.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Constants.WIDTH,
    height: Constants.WIDTH / 1.453,
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
    fontSize: Constants.WIDTH / 8.2,
    textAlign: 'center',
    padding: 20,
  },
});

const mapStateToProps = state => ({
  data: state.chart.surah,
  images: Constants.SURAH_CHART_IMAGES,
  mainImage: SurahChartImg,
  styles,
  navPath: 'FastingDay',
  DefaultItem: ({ main }) => (
    <Text
      style={styles.text}
    >
      {main}
    </Text>
  ),
});

export default connect(
  mapStateToProps,
  { updateChart: updateSurahChart },
)(Chart);
