import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, ImageBackground } from 'react-native';
import Chart from '../components/Chart';
import { updateTarawihChart } from '../actions';
import Constants from '../Constants';
import TarawihChartImg from '../../Images/Tarawih/main.png';
import TarawihGreyImg from '../../Images/Tarawih/grey.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Constants.WIDTH,
    height: Constants.WIDTH / 1.336,
  },
  dataImage: {
    width: Constants.WIDTH / 4,
    height: (Constants.WIDTH / 4) * 1.851,
    justifyContent: 'center',
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
    backgroundColor: 'transparent',
    color: 'white',
  },
});

const DefaultItem = ({ main }) => (
  <ImageBackground source={TarawihGreyImg} style={styles.dataImage}>
    <Text
      style={styles.text}
    >
      {main}
    </Text>
  </ImageBackground>
);

const mapStateToProps = state => ({
  data: state.chart.tarawih,
});

const mapDispatchToProps = dispatch => ({
  updateChart: () => dispatch(updateTarawihChart()),
  images: Constants.TARAWIH_CHART_IMAGES,
  mainImage: TarawihChartImg,
  styles,
  navPath: 'TarawihDay',
  DefaultItem,
});
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
