import test from 'tape';
import {ACTION_TYPES, nodeAddAC} from './nodes';

test('NODE_ADD creator should create action', assert => {
  const expected = {
    type: ACTION_TYPES.NODE_ADD,
    t: 2,
    id: 5
  };
  assert.deepEqual(nodeAddAC(2, 5), expected);
  assert.end();
});
