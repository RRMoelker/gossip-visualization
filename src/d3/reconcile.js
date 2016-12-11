const createLinkWithReference = (nodes, link) => {
  // convert reference by value to reference by reference
  const source = nodes.filter(n => n.id === link.source.id)[0];
  const target = nodes.filter(n => n.id === link.target.id)[0];
  return {source, target};
};

/**
 * Incorperate changes in newDate in old data objects. References are kept intact.
 * Required for D3 to keep proper references.
 *
 * NOTE: This code is messy and unoptimized, TODO
 */
export const reconcile = (data, newData) => {
  // remove self links
  newData.links = newData.links.filter(link => link.source.id !== link.target.id);

  // update data object to reflect new data.
  newData.nodes.forEach(newNode => {
    const node = data.nodes.find(node => node.id === newNode.id);
    if (node) {
      // already exists, copy properties
      node.fail = newNode.fail;
    } else {
      // console.log(newNode);
      data.nodes.push(newNode);
    }
  });

  const nodes2 = data.nodes.filter(node => {
    return newData.nodes.findIndex(newNode => node.id === newNode.id) !== -1;
  });
  data.nodes = nodes2;

  // remove old links
  const linksRemoved = data.links.filter(link => {
    return newData.links.findIndex(newLink =>
      link.source.id === newLink.source.id &&
      link.target.id === newLink.target.id
      ) !== -1;
  });
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
};
