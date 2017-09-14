import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import Day from '../components/Day';
import Constants from '../Constants';

const marginTop = 20;
const imageHeight = Constants.WIDTH / 4;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  images: {
    marginTop,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {
    width: imageHeight,
    height: imageHeight * 1.851,
  },
  enlargedImage: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: 180,
    height: 180,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 0.001,
    marginTop: 150,
    padding: 7,
  },
});

const mapDispatchToProps = dispatch => ({
  images: Constants.TARAWIH_CHART_IMAGES,
  styles,
  extraHeight: marginTop + imageHeight,
});

export default connect(
  null,
  mapDispatchToProps,
)(Day);
