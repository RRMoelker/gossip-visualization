import test from 'tape';
import parser from './parser';
import storeCreator from './store';

test('should read node starts', assert => {
  const store = storeCreator();
  const expected = {
    t: 33,
    nodes: [1]
  };
  const line = "1.0.0.0:0 [33] Node start";
  parser(store, line);

  assert.deepEqual(store.getState(), expected);
  assert.end();
});
