import React from 'react';
import {connect} from 'react-redux';

class TimeDisplay extends React.Component {
  render() {
    return (
      <span>
        Simulation time: {this.props.t}
      </span>
    );
  }
}

TimeDisplay.propTypes = {
  t: React.PropTypes.number
};

const mapStateToProps = state => {
  return {
    t: state.t
  };
};

export default connect(mapStateToProps)(TimeDisplay);
