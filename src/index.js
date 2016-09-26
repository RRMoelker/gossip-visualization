import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import store from './data/store';
import {nodeAddAC} from './data/nodes';

import App from './app/App';

store.dispatch(nodeAddAC(2, 5));

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);

