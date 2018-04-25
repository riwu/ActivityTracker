import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { addListener } from '../../App';
import Drawer from './Drawer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AppWithNavigationState = ({ dispatch, navigation }) => (
  <View style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <Drawer navigation={addNavigationHelpers({ dispatch, state: navigation, addListener })} />
  </View>
);

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps)(AppWithNavigationState);
