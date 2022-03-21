import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropsTypes from 'prop-types';
import './styles.css';

class Timer extends Component {
  render() {
    const { timer, timePercent } = this.props;
    return (
      <div className="timerContainer">
        <span className="timer">
          <CircularProgressbar
            value={ timePercent }
            text={ String(timer).padStart(2, '0') }
            background
            styles={ buildStyles({
              pathColor: 'rgb(132, 44, 139)',
              textColor: 'white',
              trailColor: '#d6d6d6',
              backgroundColor: 'rgb(132, 44, 139)',
            }) }
          />
        </span>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropsTypes.number.isRequired,
  timePercent: PropsTypes.number.isRequired,
};

export default Timer;
