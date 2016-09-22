import React from 'react';
import {connect} from 'react-redux';

class NodesList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.nodes.map(node =>
          <li key={node}>hello item {node}</li>
        )}
      </ul>
    );
  }
}

NodesList.propTypes = {
  nodes: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    nodes: state.nodes
  };
};

const mapDispatchToProps = () => {
  return {
//     // onTodoClick: (id) => {
//     //   dispatch(toggleTodo(id))
//     // }
  };
};

export default connect(
  mapStateToProps,
  {mapDispatchToProps}
)(NodesList);