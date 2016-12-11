import React from 'react';
import {Provider} from 'react-redux';

import GraphExplorer from './GraphExplorer';
import GraphView from './GraphView';
import TimeMonitor from './TimeMonitor';

class App extends React.Component {
  static propTypes = {
    store: React.PropTypes.object
  };
  render() {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <div className="appContainer column">
          <div className="main-ui row">
            <GraphView/>
            <GraphExplorer/>
          </div>
          <div className="footer timeMonitor">
            <TimeMonitor/>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
