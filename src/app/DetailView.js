import React from 'react';
import {connect} from 'react-redux';

class DetailView extends React.Component {
  render() {
    return (
      <div className="graph-explorer__item box">
       Selection details
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