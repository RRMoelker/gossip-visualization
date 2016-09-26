import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  NODE_ADD: null,
  NODE_REMOVE: null
});

/* Action creators */
export function nodeAddAC(t, id) {
  return {
    type: ACTION_TYPES.NODE_ADD,
    t,
    id
  };
}

const initialState = [];
export const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.NODE_ADD:
      return [...state, action.id];
    default:
      return state;
  }
};
