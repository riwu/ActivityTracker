/**
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BackHandler } from 'react-native';

import './src/GlobalProps';
import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';
import AppNavigator from './src/navigators/Drawer';
import CONSTANTS from './src/CONSTANTS';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.store = createStore(AppReducer);

    BackHandler.addEventListener(CONSTANTS.BACK, () => {
      const nav = this.store.getState().nav;
      const pathAndParams = AppNavigator.router.getPathAndParamsForState(nav);
      if (pathAndParams.params === undefined) {
        return false;
      }
      this.store.dispatch({ type: CONSTANTS.BACK });
      return true;
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
