/* eslint-env jasmine */
import React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TestUtils from 'react/lib/ReactTestUtils';
import App from './App';

describe('app component', () => {
  it('should render node list', () => {
    const mockStore = configureMockStore();
    const initialState = {
      nodes: [1, 2, 3, 4]
    };
    const store = mockStore(initialState);

    const app = TestUtils.renderIntoDocument(<Provider store={store}><App/></Provider>);

    const ul = TestUtils.findRenderedDOMComponentWithTag(app, 'ul');
    expect(ul.children.length).toEqual(initialState.nodes.length);
  });
});
