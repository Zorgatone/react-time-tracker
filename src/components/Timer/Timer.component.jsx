import React, { Component } from 'react';

import { precisionNow } from '../../utilities/precisionNow';
import { BtnPrimary } from '../BtnPrimary';
import { TextField } from '../TextField';

import './Timer.style.css';

export class Timer extends Component {

  constructor() {
    super();

    this.state = {
      label: '',
      running: false,
      startTimestamp: null,
      lastTimestamp: null,
      elapsedTimestamp: null,
      startDate: null
    };

    this.updateLabel = this.updateLabel.bind(this);
    this.toggle = this.toggle.bind(this);
    this.step = this.step.bind(this);
  }

  componentDidMount() {
    if (this.props.start === true) {
      this.start();
    }
  }

  updateLabel(event) {
    this.setState(Object.assign({}, this.state, {
      label: event.target.value
    }));
  }

  render() {
    const running = this.state.running;
    let hours = '00';
    let minutes = '00';
    let seconds = '00';

    if (running) {
      let elapsedTimestamp = this.state.elapsedTimestamp;
      const h = Math.floor(elapsedTimestamp / 3600000);
      if (h > 0) { elapsedTimestamp -= h * 3600000; }
      const m = Math.floor(elapsedTimestamp / 60000);
      if (m > 0) { elapsedTimestamp -= m * 60000; }
      const s = Math.floor(elapsedTimestamp / 1000);

      hours = h.toString().padStart(2, '0');
      minutes = m.toString().padStart(2, '0');
      seconds = s.toString().padStart(2, '0');
    }

    return (
      <div className="timer">
        <div className="timer-name">
          <TextField onKeyPress={this.updateLabel} />
        </div>
        <div className="timer-counter">
          <span className="hours">{hours}</span>:
          <span className="minutes">{minutes}</span>:
          <span className="seconds">{seconds}</span>
        </div>
        <BtnPrimary onClick={this.toggle} className="button timer-start">
          { running ? 'Stop' : 'Start' } timer
        </BtnPrimary>
      </div>
    );
  }

  step() {
    if (this.state.running) {
      const time = precisionNow();
      this.setState(Object.assign({}, this.state, {
        lastTimestamp: time,
        elapsedTimestamp: time - this.state.startTimestamp
      }));
      window.requestAnimationFrame(this.step);
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
      startDate: new Date(),
      startTimestamp: now,
      lastTimestamp: now,
      elapsedTimestamp: 0,
      running: true
    }));

    window.requestAnimationFrame(this.step);
  }

  stop() {
    if (!this.state.running) {
      return;
    }

    this.setState(Object.assign({}, this.state, {
      running: false,
      elapsedTimestamp: 0
    }));

    if ('function' === typeof this.props.onComplete) {
      this.props.onComplete({
        startDate: this.state.startDate,
        label: this.state.label,
        elapsedTimestamp: this.state.elapsedTimestamp
      });
    }
  }

}

export default Timer;
