import React from 'react';
import {connect} from 'react-redux';
import D3Graph from '../d3/D3Graph';

class ReactGraph extends React.Component {

  constructor(props) {
    super(props);
    this.d3Graph = new D3Graph();
    this.bootstrapGraph = this.bootstrapGraph.bind(this);
  }

  _getGraphData() {
    const nodes = this.props.nodes;
    let links = this.props.edges;

    links = this.idToReference(nodes, links);
    return {
      nodes,
      links
    };
  }

  idToReference(nodes, links) {
    // convert reference by value to reference by reference
    return links.map(link => {
      const source = nodes.filter(n => n.id === link.from)[0];
      const target = nodes.filter(n => n.id === link.to)[0];
      return {source, target};
    });
  }

  componentDidUpdate() {
    const data = this._getGraphData();
    this.d3Graph.update(data);
  }

  componentWillUnmount() {
    this.d3Graph.destroy();
  }

  bootstrapGraph(svg) {
    const data = this._getGraphData();

    this.d3Graph.create(svg, 1000, 1000, data);
  }

  render() {
    return <svg viewBox="250 250 500 500" preserveAspectRatio="xMidYMid meet" ref={this.bootstrapGraph}/>;
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

