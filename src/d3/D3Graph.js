import * as d3 from "d3"; // see https://github.com/d3/d3/blob/master/README.md#installing
import classnames from "classnames";

import {reconcile} from "./reconcile";

const t = d3.transition().duration(1500);

export default class D3Graph {
  create(element, width, height, newData) {
    this.svg = d3.select(element)
      .attr("width", width)
      .attr("height", height);

    this.data = {
      nodes: [],
      links: []
    };
    reconcile(this.data, newData);
    const {nodes, links} = this.data;

    const that = this;
    function tick() {
      that.nodeGroup.attr('transform', d => `translate(${d.x}, ${d.y})`);

      that.linkGroup.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    }

    this.force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .charge(-400)
        .linkDistance(200)
        .size([width, height])
        .on("tick", tick);

    this.nodeGroup = this.svg.selectAll(".node");
    this.linkGroup = this.svg.selectAll(".link");

    this._update();
  }

  _update() {
    this.linkGroup = this.linkGroup.data(this.force.links(), d => `${d.source.id}-${d.target.id}`);
    this.linkGroup.enter()
      .insert("line", ".node")
      .attr("class", "link");
    this.linkGroup
      .exit().remove();

    // nodes
    this.nodeGroup = this.nodeGroup.data(this.force.nodes(), d => d.id);

    // UPDATE existing nodes
    this.nodeGroup
      .attr("class", d => classnames("node", {failed: d.fail}));

    // ADD node(s)
    const g = this.nodeGroup.enter().append('svg:g')
      .attr("class", classnames("node", "new"));

    g.append("circle");

    // nodes text
    g.append('svg:text')
      .attr('x', 0)
      .attr('y', 4)
      .attr('class', 'id')
      .text(d => d.id);

    // REMOVE nodes
    this.nodeGroup.exit()
        .attr("class", "node", "remove")
      .transition(t)
        .attr("y", 60)
        .style("fill-opacity", 1e-6)
        .remove();

    this.force.start();
  }

  update(newData) {
    reconcile(this.data, newData);
    const {nodes, links} = this.data;
    this.force
      .nodes(nodes)
      .links(links);
    this._update();
  }

  destroy() {
    console.error("destroy graph not yet implemented");
  }

}
