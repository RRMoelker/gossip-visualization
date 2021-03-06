import {createStore} from 'redux';
import {nodeReducer} from './nodes';
import {edgeReducer} from './edges';
import TimeMonitor from '../app/TimeMonitor';

// modified variant of combinedReducer: http://redux.js.org/docs/basics/Reducers.html
const initialState = {
  t: 0
};
const rootReducer = (state = initialState, action) => {
  return {
    t: action.t ? action.t : state.t,
    nodes: nodeReducer(state.nodes, action),
    edges: edgeReducer(state.edges, action)
  };
};

export default (state = initialState) => createStore(rootReducer, state, TimeMonitor.instrument());
