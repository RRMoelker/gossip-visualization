import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import storeCreator from './data/store';
import parser from './data/parser';
import App from './app/App';

const logFile = './log/simple.log';
const store = storeCreator();

// store.subscribe(() => console.log(store.getState()));

fetch(logFile)
  .then(response => response.text())
  .then(text => parser([], text))
  .then(actions => actions.forEach(action => store.dispatch(action)));

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('root')
);

