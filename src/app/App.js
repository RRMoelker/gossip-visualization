import React from 'react';
import {Provider} from 'react-redux';

import TimeDisplay from './TimeDisplay';
import NodeList from './NodeList';
import TimeMonitor from './TimeMonitor';

class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object
  };
  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div>
          <TimeDisplay/>
          <NodeList/>
          <TimeMonitor/>
        </div>
      </Provider>
    );
  }
}

export default App;
