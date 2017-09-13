import { connect } from 'react-redux';
import FastingChart from '../components/FastingChart';
import { updateFastingChart } from '../actions';

const mapStateToProps = state => ({
  data: state.fastingChart,
});

export default connect(
  mapStateToProps,
  { updateFastingChart },
)(FastingChart);
