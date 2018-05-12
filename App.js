import React from 'react';
import { Platform, AsyncStorage, AppState, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { Updates } from 'expo';

import reducer from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';

const REDUX_VERSION = 4;

const migrations = [...Array(REDUX_VERSION + 1)].reduce((acc, e, i) => {
  acc[i] = (state) => {
    const { navigation, ...rest } = state;
    return rest;
  };
  return acc;
}, {});

const config = {
  key: 'root',
  storage: AsyncStorage,
  version: REDUX_VERSION,
  migrate: createMigrate(migrations),
};

const middleware = createReactNavigationReduxMiddleware('root', (state) => state.navigation);
export const addListener = createReduxBoundAddListener('root');

const store = createStore(
  persistReducer(config, reducer),
  composeWithDevTools({ port: 8000 })(applyMiddleware(middleware)),
);

const persistor = persistStore(store);
// persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
);

if (process.env.NODE_ENV !== 'development') {
  AppState.addEventListener('change', async (newState) => {
    if (newState === 'inactive') return; // avoid repeated calls
    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (!isAvailable) return;
    await Updates.fetchUpdateAsync();
    if (newState !== 'active') return;
    Alert.alert(
      'Update available',
      'Reload for the latest version.\n' +
        `Some updates can only be delivered over ${
          Platform.OS === 'ios' ? 'App Store' : 'Google Play'
        }, look up for them!`,
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Reload', onPress: () => Updates.reload() }],
    );
  });
}

export default App;
