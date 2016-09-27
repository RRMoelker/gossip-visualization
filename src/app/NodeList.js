import React from 'react';
import {connect} from 'react-redux';

class NodeList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.nodes.map(node =>
          <li key={node.id}>Node {node.id}, members: {node.members.join(',')}</li>
        )}
      </ul>
    );
  }
}

NodeList.propTypes = {
  nodes: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    nodes: state.nodes
  };
};


export default connect(mapStateToProps)(NodeList);
