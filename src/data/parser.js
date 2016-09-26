/*
Function that parses a text to a stream of actions that are inserted into the Redux store.
*/
import {nodeAddAC} from './nodes';

const parseLine = (line, store) => {
  const re = /(\d).0.0.0:0 \[(\d+)\] Node start$/i;
  const result = re.exec(line);
  if (result) {
    const node = parseInt(result[1], 10);
    const t = parseInt(result[2], 10);
    console.log('line: ', line.trim());
    console.log(result);
    console.log(node, t);
    store.dispatch(nodeAddAC(t, node));
  }
};

// ##Node join to other node
// ```
// 1.0.0.0:0 [1] Node 2.0.0.0:0 joined at time 1
// ```

// Two way if
// 2.0.0.0:0 [7] Node 1.0.0.0:0 joined at time 7

// ## Crash stop
// 8.0.0.0:0 [100] Node failed at time = 100

// ## Node removal from list
// ```
// 10.0.0.0:0 [133] Node 5.0.0.0:0 removed at time 133
// ```

// ## Detected failure
// ```
// 10.0.0.0:0 [113] Node 5.0.0.0:0 failing target
// ```

// ## Data send over gossip
// ```
// 1.0.0.0:0 [5] Node 6.0.0.0:0 gossiping
// ```

export default function (store, text) {
  console.log('parsing start');
  text.split("\n").map(line => parseLine(line, store));
  console.log('parsing done');
}
