import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import Drawer from './Drawer';

const AppWithNavigationState = ({ dispatch, navigation }) => (
  <Drawer navigation={addNavigationHelpers({ dispatch, state: navigation })} />
);

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
