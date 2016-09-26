import test from 'tape';
import parser from './parser';
import storeCreator from './store';

test('should read node starts', assert => {
  const store = storeCreator();
  const expected = {
    t: 33,
    nodes: [{ id: 1, members: [] }]
  };
  const line = "1.0.0.0:0 [33] Node start";
  parser(store, line);

  assert.deepEqual(store.getState(), expected);
  assert.end();
});

test('should read node joins', assert => {
  const store = storeCreator({
    t: 0,
    nodes: [
      { id:5, members: [] },
      { id: 1, members: [] }
    ]
  });
  const expected = {
    t: 33,
    nodes: [
      { id:5, members: [] },
      { id: 1, members: [2] }
    ]
  };
  const line = "1.0.0.0:0 [33] Node 2.0.0.0:0 joined at time 1";
  parser(store, line);

  assert.deepEqual(store.getState(), expected);
  assert.end();
});