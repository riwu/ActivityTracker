import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from '../../App';
import Drawer from './Drawer';

const AppWithNavigationState = ({ dispatch, navigation }) => (
  <Drawer navigation={addNavigationHelpers({ dispatch, state: navigation, addListener })} />
);

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
