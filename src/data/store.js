import redux from 'redux';

import {nodeReducer, nodeAddAC} from './nodes';

// modified variant of combinedReducer: http://redux.js.org/docs/basics/Reducers.html
const initialState = {
  t: 0
};
const gossipApp = (state = initialState, action) => {
  if (action.t) {
    console.assert(action.t >= state.t, {message: 'Action is from the past'});
    return {
      t: action.t,
      nodes: nodeReducer(state.nodes, action)
    };
  }
  return state;
};

const store = redux.createStore(gossipApp);

store.dispatch(nodeAddAC(2, 5));

store.subscribe(() =>
  console.log(store.getState())
);

export default store;
