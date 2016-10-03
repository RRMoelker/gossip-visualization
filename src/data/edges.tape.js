import test from 'tape';
import {actionCreators} from './nodes';
import {edgeReducer} from './edges';

const t = 66;

test('should add directed edge', assert => {
  const result = edgeReducer([], actionCreators.nodeMemberAdd(t, 1, 5));

  const expected = [{from: 1, to: 5}];
  assert.deepEqual(result, expected);
  assert.end();
});

test('should add multiple directed edges', assert => {
  const result = edgeReducer([
        {from: 1, to: 5}
  ], actionCreators.nodeMemberAdd(t, 2, 5));

  const expected = [
    {from: 1, to: 5},
    {from: 2, to: 5}
  ];
  assert.deepEqual(result, expected);
  assert.end();
});

test('should add bidirectional edge', assert => {
  const result = edgeReducer([
        {from: 1, to: 5}
  ], actionCreators.nodeMemberAdd(t, 5, 1));

  const expected = [
    {from: 1, to: 5},
    {from: 5, to: 1}
  ];
  assert.deepEqual(result, expected);
  assert.end();
});

test('should remove edge', assert => {
  const result = edgeReducer([
        {from: 1, to: 5},
        {from: 2, to: 5}
  ], actionCreators.nodeMemberRemove(t, 2, 5));

  const expected = [
    {from: 1, to: 5}
  ];
  assert.deepEqual(result, expected);
  assert.end();
});
