import * as d3 from "d3"; //see https://github.com/d3/d3/blob/master/README.md#installing

export default class D3Graph {
  _drawPoints(el, data) {
    this.lines
      .selectAll("line")
      .data(data.links)
      .enter()
      .append("line")
      .attr("stroke", "black")

    this.nodes
      .selectAll("circle")
      .data(data.nodes)
      .enter().append("circle")
      .attr("r", '10');
  };

  create(el, width, height, data) {
    var svg = d3.select(el)
        .attr('width', width)
        .attr('height', height);

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY(0))
        .force("x", d3.forceX(0))

    this.lines = svg.append("g")
        .attr("class", "links")

    this.nodes = svg.append("g")
        .attr("class", "nodes")

    var ticked = function() {
        d3.select(el).selectAll('line')
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        d3.select(el).selectAll('circle')
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }  

    simulation
        .nodes(data.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(data.links);    

    this.update(el, data);
  };

  update(el, data) {
    this._drawPoints(el, data);
  };

  destroy(el) {
  };
}