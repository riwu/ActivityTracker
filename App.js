import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducer from './src/reducers';
import MainApp from './src/containers/App';

const store = createStore(reducer, undefined); // autoRehydrate()

persistStore(store, { storage: AsyncStorage });

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
