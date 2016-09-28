import test from 'tape';
import {_ACTION_TYPES, actionCreators, nodeReducer} from './nodes';

const t = 66;

test('NODE_ADD creator should create action', assert => {
  const expected = {
    type: _ACTION_TYPES.NODE_ADD,
    t: 2,
    id: 5
  };
  assert.deepEqual(actionCreators.nodeAdd(2, 5), expected);
  assert.end();
});

test('should add node', assert => {
  const result = nodeReducer([], actionCreators.nodeAdd(t, 5));

  const expected = [{ id: 5, members: []}];
  assert.deepEqual(result, expected);
  assert.end();
});

test('should add multiple nodes', assert => {
  const start = [{ id: 5, members: [] }];

  const result = nodeReducer(start, actionCreators.nodeAdd(t, 3));

  const expected = [{ id: 5, members: []}, {id: 3, members: []}];
  assert.deepEqual(result, expected);
  assert.end();
});

test('member should join correct node', assert => {
  const start = [
                  { id: 5, members: [] },
                  { id: 9, members: [] }
                ];

  const result = nodeReducer(start, actionCreators.nodeMemberAdd(t, 9, 8));

  const expected = [
                  { id: 5, members: [] },
                  { id: 9, members: [8] }
                ];
  assert.deepEqual(result, expected);
  assert.end();
});

test('node should fail', assert => {
  const start = [
                  { id: 5, members: [] },
                  { id: 9, members: [] }
                ];

  const result = nodeReducer(start, actionCreators.nodeFail(t, 9));

  const expected = [
                  { id: 5, members: [] },
                  { id: 9, members: [], fail: true }
                ];
  assert.deepEqual(result, expected);
  assert.end();
});

test('member should be removed from node', assert => {
  const start = [
                  { id: 5, members: [], fail:true },
                  { id: 9, members: [6, 5] }
                ];

  const result = nodeReducer(start, actionCreators.nodeMemberRemove(t, 9, 5));

  const expected = [
                  { id: 5, members: [], fail: true  },
                  { id: 9, members: [6] }
                ];
  assert.deepEqual(result, expected);
  assert.end();
});