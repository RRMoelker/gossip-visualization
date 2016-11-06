import React from 'react';
import {connect} from 'react-redux';
import D3Graph from '../d3/D3Graph';

class ReactGraph extends React.Component {

  constructor(props) {
    super(props);
    this.d3Graph = new D3Graph();
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

  componentDidMount() {
    const el = this.refs.svg;

    const data = this._getGraphData();

    this.d3Graph.create(el, 960, 500, data);
  }

  componentDidUpdate() {
    const data = this._getGraphData();
    this.d3Graph.update(data);
  }

  componentWillUnmount() {
    this.d3Graph.destroy();
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

