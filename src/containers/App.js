import React from 'react';
import { connect } from 'react-redux';
import { BackHandler, Platform, Image } from 'react-native';

import { setCustomText } from 'react-native-global-props';
import { Font } from 'expo';
import Lato from '../../Lato/Lato.ttf';

import AppWithNavigationState from '../navigators/AppNavigator';
import Drawer from '../navigators/Drawer';

import CONSTANTS from '../constants';

import { fontLoaded, navigateBack } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.loadFont();
    this.addBackHandler();
  }

  loadFont() {
    Font.loadAsync({
      Lato,
    }).then(() => {
      const customTextProps = {
        style: {
          fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue' : 'Lato',
        },
      };
      setCustomText(customTextProps);
      this.props.fontLoaded();
    });
  }

  addBackHandler() {
    BackHandler.addEventListener(CONSTANTS.BACK, () => {
      const pathAndParams = Drawer.router.getPathAndParamsForState(this.props.navigation);
      if (pathAndParams.params === undefined) {
        return false;
      }
      this.props.navigateBack();
      return true;
    });
  }

  render() {
    if (!this.props.isFontLoaded) return null;
    return <AppWithNavigationState />;
  }
}

const mapStateToProps = (state) => ({
  isFontLoaded: state.isFontLoaded,
  navigation: state.navigation,
});

export default connect(mapStateToProps, { fontLoaded, navigateBack })(App);
