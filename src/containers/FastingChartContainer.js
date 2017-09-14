import { connect } from 'react-redux';
import FastingChart from '../components/FastingChart';
import { updateFastingChart } from '../actions';
import Constants from '../Constants';

const mapStateToProps = state => ({
  data: state.fastingChart,
  images: Constants.FASTING_CHART_IMAGES,
});

export default connect(
  mapStateToProps,
  { updateFastingChart },
)(FastingChart);
