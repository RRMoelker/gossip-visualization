import redux from 'redux';

import nodes from './nodes';

const gossipApp = redux.combineReducers({
  nodes
});

const store = redux.createStore(gossipApp);

store.subscribe(() =>
  console.log(store.getState())
);

export default store;
