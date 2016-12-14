/* eslint-env jasmine */
import React from 'react';
import configureMockStore from 'redux-mock-store';
import ReactTestUtils from 'react-addons-test-utils';
import EdgeList from './EdgeList';

describe('The edge list component', () => {
  it('should render bidirectional edges', () => {
    const storeState = {
      edges: [
        {from: 1, to: 5},
        {from: 2, to: 5},
        {from: 5, to: 2}
      ]
    };
    const store = configureMockStore()(storeState);

    const edgeList = ReactTestUtils.renderIntoDocument(<EdgeList store={store}/>);

    const ul = ReactTestUtils.findRenderedDOMComponentWithTag(edgeList, 'ul');
    expect(ul.children.length).toEqual(storeState.edges.length);
    expect(ul.textContent).toContain('Edge from 1 to 5');
    expect(ul.textContent).toContain('Edge from 2 to 5');
    expect(ul.textContent).toContain('Edge from 5 to 2');
  });
});
