import redux from 'redux';
import {nodeReducer} from './nodes';
import DevTool from '../app/monitor';

// modified variant of combinedReducer: http://redux.js.org/docs/basics/Reducers.html
const initialState = {
  t: 0
};
const rootReducer = (state = initialState, action) => {
  return {
    t: action.t ? action.t : state.t,
    nodes: nodeReducer(state.nodes, action)
  };
};

const store = redux.createStore(rootReducer, initialState, DevTool.instrument());

export default store;
