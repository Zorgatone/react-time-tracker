import React, { Component } from 'react';

import './Timer.style.css';

export class Timer extends Component {

  constructor() {
    super();

    this.state = {
      running: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      timer: null
    };
  }

  render() {
    const { running, hours, minutes, seconds } = this.state;

    return (
      <div className="timer">
        <div className="timer-counter">
          <span className="hours">{hours < 10 ? '0'+ hours : hours}</span>:
          <span className="minutes">{minutes < 10 ? '0' + minutes : minutes}</span>:
          <span className="seconds">{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
        <button onClick={this.toggle.bind(this)} type="button" className="timer-start">
          { running ? 'Stop' : 'Start' } timer
        </button>
      </div>
    );
  }

  toggle() {
    if (this.state.running) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    if (this.state.running) {
      return;
    }

    this.setState(Object.assign({}, this.state, {
      running: true,
      timer: setInterval(() => {
        let { hours, minutes, seconds, running } = this.state;

        if (running) {
          if (seconds + 1 > 59) {
            seconds = 0;
            if (minutes + 1 > 59) {
              minutes = 0;
              hours++;
            } else {
              minutes++;
            }
          } else {
            seconds++;
          }
  
          this.setState(Object.assign({}, this.state, {
            hours, minutes, seconds
          }));
        }
      }, 1000)
    }));
  }

  stop() {
    if (!this.state.running) {
      return;
    }

    clearInterval(this.state.timer);

    if ('function' === typeof this.props.onComplete) {
      const { hours, minutes, seconds } = this.state;

      this.props.onComplete({ hours, minutes, seconds });
    }

    this.setState(Object.assign({}, this.state, {
      running: false,
      timer: null,
      hours: 0,
      minutes: 0,
      seconds: 0
    }));
  }

}

export default Timer;
