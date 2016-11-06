import * as d3 from "d3"; // see https://github.com/d3/d3/blob/master/README.md#installing

export const createGraph = (element) => {
  let width = 960,
    height = 500;

  const svg = d3.select(element)
    .attr("width", width)
    .attr("height", height);

  // const svg = d3.select("body").append("svg")
  //     .attr("width", width)
  //     .attr("height", height);

  const color = d3.scale.category10();

  let nodes = [],
    links = [];

  const force = d3.layout.force()
      .nodes(nodes)
      .links(links)
      .charge(-400)
      .linkDistance(120)
      .size([width, height])
      .on("tick", tick);

  let node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

  // 1. Add three nodes and three links.
  setTimeout(() => {
    let a = {id: "a"}, b = {id: "b"}, c = {id: "c"};
    nodes.push(a, b, c);
    links.push({source: a, target: b}, {source: a, target: c}, {source: b, target: c});
    start();
  }, 0);

  // 2. Remove node B and associated links.
  setTimeout(() => {
    nodes.splice(1, 1); // remove b
    links.shift(); // remove a-b
    links.pop(); // remove b-c
    start();
  }, 3000);

  // Add node B back.
  setTimeout(() => {
    let a = nodes[0], b = {id: "b"}, c = nodes[1];
    nodes.push(b);
    links.push({source: a, target: b}, {source: b, target: c});
    start();
  }, 6000);

  function start() {
    link = link.data(force.links(), d => { return d.source.id + "-" + d.target.id; });
    link.enter().insert("line", ".node").attr("class", "link");
    link.exit().remove();

    node = node.data(force.nodes(), d => { return d.id;});
    node.enter().append("circle").attr("class", d => { return "node " + d.id; }).attr("r", 8);
    node.exit().remove();

    force.start();
  }

  function tick() {
    node.attr("cx", d => { return d.x; })
        .attr("cy", d => { return d.y; });

    link.attr("x1", d => { return d.source.x; })
        .attr("y1", d => { return d.source.y; })
        .attr("x2", d => { return d.target.x; })
        .attr("y2", d => { return d.target.y; });
  }
};
