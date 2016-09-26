/*
Function that parses a text to a stream of actions that are inserted into the Redux store.
*/
import {nodeAddAC, nodeMemberAddAC} from './nodes';

const nodeAdd = (store, result) => {
  const t = parseInt(result[2], 10);
  const node = parseInt(result[1], 10);
  store.dispatch(nodeAddAC(t, node));
}

const nodeMemberAdd = (store, result) => {
  const t = parseInt(result[2], 10);
  const node = parseInt(result[1], 10);
  const member = parseInt(result[3], 10);
  store.dispatch(nodeMemberAddAC(t, node, member));
}

const regexFunctions = [
  [
  /(\d).0.0.0:0 \[(\d+)\] Node start$/, nodeAdd
  ],
  [
  /(\d).0.0.0:0 \[(\d+)\] Node (\d+).0.0.0:0 joined at time (\d+)$/, nodeMemberAdd
  ]
];

const parseLine = (store, line) => {
  regexFunctions.some(regexFunction => {
    const [re, func] = regexFunction;
    const result = re.exec(line);
    if (result) {
      func(store, result);
      return true;
    }
  });
};

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
  text.split("\n").map(line => parseLine(store, line.trim()));
  console.log('parsing done');
}
