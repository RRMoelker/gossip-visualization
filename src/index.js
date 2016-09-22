import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './index.scss';

import store from './data/store';
import App from './app/app';

console.log('store:', store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

