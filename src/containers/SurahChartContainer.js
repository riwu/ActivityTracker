import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import Chart from '../components/Chart';
import { updateSurahChart } from '../actions';
import Constants from '../Constants';
import SurahChartImg from '../../Images/Surah/main.png';
import Grey from '../../Images/Surah/grey/divided_17.gif';

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
    width: Constants.WIDTH / 3,
    height: Constants.WIDTH / 3 / 1.98,
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

const DefaultItem = ({ main }) => (
  <Image source={Grey} style={styles.dataImage} />
);

const mapStateToProps = state => ({
  data: state.chart.surah,
});

const mapDispatchToProps = dispatch => ({
  updateChart: () => dispatch(updateSurahChart()),
  images: Constants.SURAH_CHART_IMAGES,
  mainImage: SurahChartImg,
  styles,
  navPath: 'SurahDay',
  numColumns: 3,
  DefaultItem,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chart);
