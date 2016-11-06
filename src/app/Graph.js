import React from 'react';
import {connect} from 'react-redux';
import D3Graph from '../d3/D3Graph';

class ReactGraph extends React.Component {

  constructor(props) {
    super(props);
    this.d3Graph = new D3Graph();
  }

  _getGraphData() {
    const nodes = [{id: 'a', index: 0}, {id: 'b', index: 1}, {id: 'c', index: 2}];
    let links = [
      {source: 'a', target: 'b'},
      {source: 'a', target: 'c'},
      {source: 'b', target: 'c'}
    ];
    links = this.idToReference(nodes, links);
    return {
      nodes,
      links
    };
  }

  idToReference(nodes, links) {
    // convert reference by value to reference by reference
    return links.map(link => {
      const source = nodes.filter(n => n.id === link.source)[0];
      const target = nodes.filter(n => n.id === link.target)[0];
      return {source, target};
    });
  }

  componentDidMount() {
    const el = this.refs.svg;

    const data = this._getGraphData();

    // createGraph(el);
    this.d3Graph.create(el, 960, 500, data);

    // 2. Remove node B and associated links.
    setTimeout(() => {
      const data = this._getGraphData();
      data.nodes.splice(1, 1); // remove b
      data.links.shift(); // remove a-b
      data.links.pop(); // remove b-c
      // let data2 = {
      //   nodes,
      //   links
      // };
      this.d3Graph.update(data);
    }, 3000);

  //   // Add node B back.
    setTimeout(() => {
        const data = this._getGraphData();
        this.d3Graph.update(data);
    }, 6000);

  }

  componentDidUpdate() {
    // this.d3Graph.update(this._getGraphData());
  }

  componentWillUnmount() {
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

