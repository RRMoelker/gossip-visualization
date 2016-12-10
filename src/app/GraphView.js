import React from 'react';
import {connect} from 'react-redux';
import Graph from './Graph';

class DetailView extends React.Component {
  render() {
    return (
      <div className="graph-view box">
        <Graph/>
      </div>
    );
  }
}

DetailView.propTypes = {
  nodes: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    nodes: state.nodes
  };
};

export default connect(mapStateToProps)(DetailView);
