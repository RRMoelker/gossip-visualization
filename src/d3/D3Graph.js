import * as d3 from "d3"; // see https://github.com/d3/d3/blob/master/README.md#installing

const createLinkWithReference = (nodes, link) => {
  // convert reference by value to reference by reference
  const source = nodes.filter(n => n.id === link.source.id)[0];
  const target = nodes.filter(n => n.id === link.target.id)[0];
  console.log("new link", source, target);
  return {source, target};
};

const reconcile = (data, newData) => {
  // update data object to reflect new data.
  newData.nodes.forEach(newNode => {
    const node = data.nodes.find(node => node.id === newNode.id);
    if (node) {
      // already exists
    } else {
      data.nodes.push(newNode);
    }
  });

  const nodes2 = data.nodes.filter(node => {
    return newData.nodes.findIndex(newNode => node.id === newNode.id) !== -1;
  });
  // console.log(nodes2);
  data.nodes = nodes2;

  // remove old links
  const linksRemoved = data.links.filter(link => {
    return newData.links.findIndex(newLink =>
      link.source.id === newLink.source.id &&
      link.target.id === newLink.target.id
      ) !== -1;
  });
  // console.log(linksRemoved);
  data.links = linksRemoved;

  // find new links
  const linksNew = newData.links.filter(newLink => {
    // return true;
    return data.links.findIndex(link =>
      link.source.id === newLink.source.id &&
      link.target.id === newLink.target.id
      ) === -1;
  });
  linksNew.forEach(link => data.links.push(createLinkWithReference(data.nodes, link)));
  console.log(linksNew);
};

export default class D3Graph {
  create(element, width, height, newData) {
    this.svg = d3.select(element)
      .attr("width", width)
      .attr("height", height);

    // const {nodes, links} = data;
    this.data = {
      nodes: [],
      links: []
    };
    reconcile(this.data, newData);
    const {nodes, links} = this.data;

    const that = this;
    function tick() {
      that.nodeGroup
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);

      that.linkGroup.attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
    }

    this.force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .charge(-400)
        .linkDistance(120)
        .size([width, height])
        .on("tick", tick);

    this.nodeGroup = this.svg.selectAll(".node");
    this.linkGroup = this.svg.selectAll(".link");

    this._update();
  }

  _update() {
    // const {nodes, links} = data;
    this.linkGroup = this.linkGroup.data(this.force.links(), d => d.source.id + "-" + d.target.id);
    this.linkGroup.enter().insert("line", ".node").attr("class", "link");
    this.linkGroup.exit().remove();

    this.nodeGroup = this.nodeGroup.data(this.force.nodes(), d => d.id);
    this.nodeGroup.enter().append("circle").attr("class", d => `node ${d.id}`).attr("r", 8);
    this.nodeGroup.exit().remove();

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
