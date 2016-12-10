import React from 'react';
import {connect} from 'react-redux';

class EdgeList extends React.Component {
  render() {
    return (
      <div className="graph-explorer__item edge-list box">
        <ul>
          {this.props.edges.map(edge =>
            <li key={String(edge.from) + edge.to}>Edge from {edge.from} to {edge.to}</li>
          )}
        </ul>
      </div>
    );
  }
}

EdgeList.propTypes = {
  edges: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    edges: state.edges
  };
};

export default connect(mapStateToProps)(EdgeList);
