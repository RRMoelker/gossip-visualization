import * as d3 from "d3"; //see https://github.com/d3/d3/blob/master/README.md#installing

var width = 960,
    height = 500;

var color = d3.scaleOrdinal(d3.schemeCategory10);;

var nodes = [],
    links = [];

// var force = d3.layout.force()
//     .nodes(nodes)
//     .links(links)
//     .charge(-400)
//     .linkDistance(120)
//     .size([width, height])
//     .on("tick", tick);

var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("y", d3.forceY(0))
        .force("x", d3.forceX(0))


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

// var node = svg.selectAll(".node"),
//     link = svg.selectAll(".link");

// // 1. Add three nodes and three links.
setTimeout(function() {
  var a = {id: "a"}, b = {id: "b"}, c = {id: "c"};
  nodes.push(a, b, c);
  links.push({source: a, target: b}, {source: a, target: c}, {source: b, target: c});
  start();
}, 0);

// 2. Remove node B and associated links.
setTimeout(function() {
  nodes.splice(1, 1); // remove b
  links.shift(); // remove a-b
  links.pop(); // remove b-c
  start();
}, 2000);

// Add node B back.
setTimeout(function() {
  var a = nodes[0], b = {id: "b"}, c = nodes[1];
  nodes.push(b);
  links.push({source: a, target: b}, {source: b, target: c});
  start();
}, 4000);

simulation
  .on("tick", tick);

simulation
  .nodes(nodes)

simulation.force("link")
  .links(links);

function start() {
  let link = svg.selectAll(".link")
  .data(links);
  link.enter().insert("line", ".node").attr("class", "link");
  link.exit().remove();

  let node = svg.selectAll(".node").data(nodes);
  node.enter().append("circle").attr("class", function(d) { return "node " + d.id; }).attr("r", 8);
  node.exit().remove();

  simulation
    .nodes(nodes)

  simulation.force("link")
    .links(links);

  simulation.alpha(1);
  simulation.restart();
}

function tick() {
  console.count('tick');
  svg.selectAll(".node").attr("cx", function(d) {
    // console.count(d.x);
    return d.x;
  })
      .attr("cy", function(d) { return d.y; })

  svg.selectAll(".link").attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}

export default {}