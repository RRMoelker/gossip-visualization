import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import storeCreator from './data/store';
import parser from './data/parser';
import App from './app/App';

const logFile = '/log/simple.log';
const store = storeCreator();

fetch(logFile)
  .then(response => response.text())
  .then(text => parser(store, text));

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);

