import { connect } from 'react-redux';
import Chart from '../components/Chart';
import { updateTarawihChart } from '../actions';
import Constants from '../Constants';

const mapStateToProps = state => ({
  data: state.chart.tarawih,
  images: Constants.TARAWIH_CHART_IMAGES,
});

export default connect(
  mapStateToProps,
  { updateTarawihChart },
)(Chart);
