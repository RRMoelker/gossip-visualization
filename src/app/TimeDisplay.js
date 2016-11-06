import React from 'react';
import {connect} from 'react-redux';

class TimeDisplay extends React.Component {
  render() {
    return (
      <div className="graph-explorer__item time-display box">
        Simulation time: {this.props.t}
      </div>
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
