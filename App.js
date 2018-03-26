import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';

import reducer from './src/reducers';
import MainApp from './src/containers/App';

const migrations = {
  0: () => ({}),
};

const config = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  migrate: createMigrate(migrations, { debug: process.env.NODE_ENV === 'development' }),
};
export const store = createStore(persistReducer(config, reducer), devToolsEnhancer());

const persistor = persistStore(store);
// persistor.purge();

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MainApp />
    </PersistGate>
  </Provider>
);

export default App;
