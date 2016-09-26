import React from 'react';
import {Provider} from 'react-redux';

import NodesList from './nodesList';
import DevTools from './monitor';

class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object
  };
  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div>
          <NodesList/>
          <DevTools/>
        </div>
      </Provider>
    );
  }
}

export default App;
