import React from 'react';
import {connect} from 'react-redux';
import {createGraph} from '../d3/D3Graph';

class ReactGraph extends React.Component {

  constructor(props) {
    super(props);
    // this.d3Graph = new D3Graph();
  }

  _getGraphData() {
    let nodes = [{id: 'Alice'}, {id: 'Bob'}, {id: 'Eve'}],
      links = [{source: 'Alice', target: 'Bob'}, {source: 'Eve', target: 'Bob'}];
    return {
      nodes,
      links
    };
  }

  componentDidMount() {
    const el = this.refs.svg;
    createGraph(el);
    // this.d3Graph.create(el, 500, 600, this._getGraphData());
  }

  componentDidUpdate() {
    const el = this.refs.svg;
    // this.d3Graph.update(el, this._getGraphData());
  }

  componentWillUnmount() {
    const el = this.refs.svg;
    // this.d3Graph.destroy(el);
  }

  render() {
    return (
      <div>
        <svg ref="svg"/>
      </div>
    );
  }
}

ReactGraph.propTypes = {
  nodes: React.PropTypes.array,
  edges: React.PropTypes.array
};

const mapStateToProps = state => {
  return {
    nodes: state.nodes,
    edges: state.edges
  };
};

export default connect(mapStateToProps)(ReactGraph);

