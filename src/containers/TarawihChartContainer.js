import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import Chart from '../components/Chart';
import { updateTarawihChart } from '../actions';
import Constants from '../Constants';
import TarawihChartImg from '../../Images/Tarawih/main.png';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width,
    height: width / 1.336,
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
  data: state.chart.tarawih,
  images: Constants.TARAWIH_CHART_IMAGES,
  mainImage: TarawihChartImg,
  styles,
});

export default connect(
  mapStateToProps,
  { updateTarawihChart },
)(Chart);
