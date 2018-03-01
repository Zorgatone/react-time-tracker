import React, { Component } from 'react';

import { precisionNow } from '../../utilities/precisionNow';
import { BtnPrimary } from '../BtnPrimary';

import './Timer.style.css';

export class Timer extends Component {

  constructor() {
    super();

    this.state = {
      running: false,
      startTime: null,
      lastTime: null,
      elapsedTime: null
    };
  }

  componentDidMount() {
    if (this.props.start === true) {
      this.start();
    }
  }

  render() {
    const running = this.state.running;
    let hours = '00';
    let minutes = '00';
    let seconds = '00';

    if (running) {
      let elapsedTime = this.state.elapsedTime;
      const h = Math.floor(elapsedTime / 3600000);
      if (h > 0) { elapsedTime -= h * 3600000; }
      const m = Math.floor(elapsedTime / 60000);
      if (m > 0) { elapsedTime -= m * 60000; }
      const s = Math.floor(elapsedTime / 1000);

      hours = h.toString().padStart(2, '0');
      minutes = m.toString().padStart(2, '0');
      seconds = s.toString().padStart(2, '0');
    }

    return (
      <div className="timer">
        <div className="timer-counter">
          <span className="hours">{hours}</span>:
          <span className="minutes">{minutes}</span>:
          <span className="seconds">{seconds}</span>
        </div>
        <BtnPrimary onClick={this.toggle.bind(this)} className="button timer-start">
          { running ? 'Stop' : 'Start' } timer
        </BtnPrimary>
      </div>
    );
  }

  step() {
    if (this.state.running) {
      const time = precisionNow();
      this.setState(Object.assign({}, this.state, {
        lastTime: time,
        elapsedTime: time - this.state.startTime
      }));
      window.requestAnimationFrame(this.step.bind(this));
    }
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

    const now = precisionNow();

    this.setState(Object.assign({}, this.state, {
      startTime: now,
      lastTime: now,
      elapsedTime: 0,
      running: true
    }));

    window.requestAnimationFrame(this.step.bind(this));
  }

  stop() {
    if (!this.state.running) {
      return;
    }

    this.setState(Object.assign({}, this.state, {
      running: false,
      elapsedTime: 0
    }));

    if ('function' === typeof this.props.onComplete) {
      this.props.onComplete(this.state.elapsedTime);
    }
  }

}

export default Timer;
