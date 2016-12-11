# Visualization of Gossip protocol simulation

[![Build Status](https://travis-ci.org/RRMoelker/gossip-visualization.svg?branch=master)](https://travis-ci.org/RRMoelker/gossip-visualization)

Deployed app: [gossip visualization](https://rrmoelker.github.io/gossip-visualization/).

Visualization of a cluster of machines maintaining a network between them. The log of an external program is parsed and the gossip protocol events are shown in the UI.

![Gossip simulation visualization app screenshot](https://cloud.githubusercontent.com/assets/205326/21080852/f8ebadd4-bfb9-11e6-8c17-c8b8236b0d7c.png)

Notes:

* Link between redux and d3 is not optimized.
* React Karma tests have been disabled ( eslint + tape test still active )

# Install
```
npm install
```

# Run
```
npm start
```

# Test

```
npm run test
```

# Credits
Started from generator output: http://fountainjs.io/
