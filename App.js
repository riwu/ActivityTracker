import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './src/reducers';
import MainApp from './src/containers/App';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
