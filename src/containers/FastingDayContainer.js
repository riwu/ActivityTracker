import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import Day from '../components/Day';
import { updateFastingChart } from '../actions';
import Constants from '../Constants';
import FastingChartImg from '../../Images/Fasting/main.png';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width,
    height: width / 1.6543,
  },
  dataImage: {
    width: width / 4,
    height: width / 4,
  },
  view: {
    flex: 1,
    width: '25%',
    borderRightWidth: 0.5,
    borderRightColor: 'white',
  },
  text: {
    fontSize: width / 8.2,
    textAlign: 'center',
    padding: 20,
  },
});

const mapStateToProps = state => ({
  data: state.chart.fasting,
  images: Constants.FASTING_CHART_IMAGES,
  mainImage: FastingChartImg,
  styles,
});

export default connect(
  mapStateToProps,
  { updateFastingChart },
)(Day);
