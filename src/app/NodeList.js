import React from 'react';
import {connect} from 'react-redux';

class NodeList extends React.Component {
  render() {
    return (
      <div className="graph-explorer__item box">
        <ul>
          {this.props.nodes.map(node =>
            <li key={node.id} className={node.fail ? 'node node--failed' : 'node'}>
              Node {node.id}, {node.fail ? "failed" : `member list: [ ${node.members.join(',')} ]`}
            </li>
          )}
        </ul>
      </div>
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
