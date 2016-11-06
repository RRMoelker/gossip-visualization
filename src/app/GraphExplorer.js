import React from 'react';

import TimeDisplay from './TimeDisplay';
import NodeList from './NodeList';
import EdgeList from './EdgeList';

class GraphExplorer extends React.Component {
  render() {
    return (
      <div className="graph-explorer">
        <TimeDisplay/>
        <NodeList/>
        <EdgeList/>
      </div>
    );
  }
}

export default GraphExplorer;
