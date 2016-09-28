import test from 'tape';
import parser from './parser';
import storeCreator from './store';
import {actionCreators} from './nodes';

test('should read node starts', assert => {
  const actions = [];
  const expected = [actionCreators.nodeAdd(33, 10)];
  const line = "10.0.0.0:0 [33] Node start";

  parser(actions, line);

  assert.deepEqual(actions, expected);
  assert.end();
});

test('should read node joins', assert => {
  const actions = [];
  const expected = [actionCreators.nodeMemberAdd(33, 10, 2)];

  const line = "10.0.0.0:0 [33] Node 2.0.0.0:0 joined at time 1";

  parser(actions, line);

  assert.deepEqual(actions, expected);
  assert.end();
});

test('should read node fails', assert => {
  const actions = [];
  const expected = [actionCreators.nodeFail(100, 8)];

  const line = "8.0.0.0:0 [100] Node failed at time = 100";

  parser(actions, line);

  assert.deepEqual(actions, expected);
  assert.end();
});


test('should read member removals', assert => {
  const actions = [];
  const expected = [actionCreators.nodeMemberRemove(133, 10, 5)];

  const line = "10.0.0.0:0 [133] Node 5.0.0.0:0 removed at time 133";

  parser(actions, line);

  assert.deepEqual(actions, expected);
  assert.end();
});
