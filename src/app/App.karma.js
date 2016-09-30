/* eslint-env jasmine */
import React from 'react';
import configureMockStore from 'redux-mock-store';
import TestUtils from 'react/lib/ReactTestUtils';
import App from './App';

App.__Rewire__('TimeMonitor', React.createClass({
  render: () => {
    return <div></div>;
  }
}));

describe('app component', () => {
  it('should render node list', () => {
    const mockStore = configureMockStore();
    const initialState = {
      nodes: [
        {id: 1, members: []},
        {id: 2, members: []},
        {id: 3, members: []},
        {id: 4, members: []}
      ]
    };
    const store = mockStore(initialState);

    const app = TestUtils.renderIntoDocument(<App store={store}/>);

    const ul = TestUtils.findRenderedDOMComponentWithTag(app, 'ul');
    expect(ul.children.length).toEqual(initialState.nodes.length);
  });
});
