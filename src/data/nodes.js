import keyMirror from 'keymirror';

export const _ACTION_TYPES = keyMirror({
  NODE_ADD: null,
  NODE_MEMBER_ADD: null,
  NODE_REMOVE: null,
  NODE_FAIL: null,
});

/* Action creators */
export const actionCreators = {
  nodeAdd: (t, id) => ({
    type: _ACTION_TYPES.NODE_ADD,
    t,
    id
  }),
  nodeMemberAdd: (t, id, member) => ({
    type: _ACTION_TYPES.NODE_MEMBER_ADD,
    t,
    id,
    member
  }),
  nodeFail: (t, id) => ({
    type: _ACTION_TYPES.NODE_FAIL,
    t,
    id
  })
}

const initialState = [];
export const nodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case _ACTION_TYPES.NODE_ADD:
      return [...state, {
        id: action.id,
        members: []
      }];
    case _ACTION_TYPES.NODE_MEMBER_ADD:
      return state.map(node => {
        if (node.id === action.id) {
          return Object.assign({}, node, {
            members: [...node.members, action.member] 
          })
        }
        return node;
      })
    case _ACTION_TYPES.NODE_FAIL:
      return state.map(node => {
        if (node.id === action.id) {
          return Object.assign({}, node, {
            fail: true
          })
        }
        return node;
      })
    default:
      return state;
  }
};
