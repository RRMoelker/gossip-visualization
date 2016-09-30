/*
Function that parses a text to a stream of actions that are inserted into the Redux store.
*/
import {actionCreators} from './nodes';

const nodeAdd = result => {
  const t = parseInt(result[2], 10);
  const node = parseInt(result[1], 10);
  return actionCreators.nodeAdd(t, node);
};

const nodeMemberAdd = result => {
  const t = parseInt(result[2], 10);
  const node = parseInt(result[1], 10);
  const member = parseInt(result[3], 10);
  return actionCreators.nodeMemberAdd(t, node, member);
};

const nodeMemberRemove = result => {
  const t = parseInt(result[2], 10);
  const node = parseInt(result[1], 10);
  const member = parseInt(result[3], 10);
  return actionCreators.nodeMemberRemove(t, node, member);
};

const nodeMemberFail = result => {
  const t = parseInt(result[2], 10);
  const node = parseInt(result[1], 10);
  return actionCreators.nodeFail(t, node);
};

const regexFunctions = [
  [
    /(\d+).0.0.0:0 \[(\d+)\] Node start$/, nodeAdd
  ],
  [
    /(\d+).0.0.0:0 \[(\d+)\] Node (\d+).0.0.0:0 joined at time (\d+)$/, nodeMemberAdd
  ],
  [
    /(\d+).0.0.0:0 \[(\d+)\] Node (\d+).0.0.0:0 removed at time (\d+)$/, nodeMemberRemove
  ],
  [
    /(\d+).0.0.0:0 \[(\d+)\] Node failed at time = \d+$/, nodeMemberFail
  ]
];

const parseLine = (actions, line) => {
  regexFunctions.some(regexFunction => {
    const [re, func] = regexFunction;
    const result = re.exec(line);
    if (result) {
      actions.push(func(result));
      return true;
    }
    return false;
  });
  return actions;
};

// ## Detected failure
// ```
// 10.0.0.0:0 [113] Node 5.0.0.0:0 failing target
// ```

// ## Data send over gossip
// ```
// 1.0.0.0:0 [5] Node 6.0.0.0:0 gossiping
// ```

export default function (actions, text) {
  console.log('parsing start');
  text.split("\n").map(line => parseLine(actions, line.trim()));
  console.log('parsing done');
  return actions;
}
