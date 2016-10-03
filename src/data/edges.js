import {immutableDelete} from './util';
import {_ACTION_TYPES} from './nodes';

export const edgeReducer = (state = [], action) => {
  switch (action.type) {
    case _ACTION_TYPES.NODE_MEMBER_ADD:
      return [...state, {
        from: action.id,
        to: action.member
      }];
    case _ACTION_TYPES.NODE_MEMBER_REMOVE: {
      const index = state.findIndex(
        edge => {
          return edge.from === action.id && edge.to === action.member;
        }
      );
      return immutableDelete(state, index);
    }
    default:
      return state;
  }
};
