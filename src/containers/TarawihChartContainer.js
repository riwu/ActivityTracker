import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, Image } from 'react-native';
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
    fontSize: Constants.WIDTH / 8.2,
    textAlign: 'center',
    padding: 20,
    backgroundColor: 'transparent',
    color: 'white',
  },
});

const mapStateToProps = state => ({
  data: state.chart.tarawih,
  images: Constants.TARAWIH_CHART_IMAGES,
  mainImage: TarawihChartImg,
  styles,
  navPath: 'TarawihDay',
  DefaultItem: ({ main }) => (
    <Image source={TarawihGreyImg} style={styles.dataImage}>
      <Text
        style={styles.text}
      >
        {main}
      </Text>
    </Image>
  ),
});

export default connect(
  mapStateToProps,
  { updateChart: updateTarawihChart },
)(Chart);
