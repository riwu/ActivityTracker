import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { AsyncStorage, AppState } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { Updates } from 'expo';

import reducer from './src/reducers';
import AppWithNavigationState from './src/navigators/AppNavigator';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = createReactNavigationReduxMiddleware('root', (state) => state.navigation);
export const addListener = createReduxBoundAddListener('root');

export const store = createStore(
  persistReducer(config, reducer),
  composeWithDevTools({ port: 8000 })(applyMiddleware(middleware)),
);

const persistor = persistStore(store);
// persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppWithNavigationState />
    </PersistGate>
  </Provider>
);

AppState.addEventListener('change', async () => {
  const { isAvailable } = await Updates.checkForUpdateAsync();
  if (!isAvailable) return;
  await Updates.fetchUpdateAsync();
  Updates.reload();
});

export default App;
