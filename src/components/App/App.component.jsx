import React, { Component } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Timer } from '../Timer';

import './App.style.css';

export class App extends Component {

  constructor() {
    super();

    this.state = {
      tasks: []
    };
  }

  render() {
    return (
      <div className="app">
        <Header />
        <i>Hello, World</i>
        <Timer onComplete={this.onComplete.bind(this)} />
        <div className="tasks">{this.renderTasks()}</div>
        <Footer />
      </div>
    );
  }

  onComplete(elapsedTime) {
    this.setState(Object.assign({}, this.state, {
      tasks: (this.state.tasks || []).concat(elapsedTime)
    }));
  }

  renderTasks() {
    let i = 0;

    return (
      <ul>
        {this.state.tasks.map((elapsedTime) => {
          const hours = Math.floor(elapsedTime / 3600000);
          if (hours > 0) { elapsedTime -= hours * 3600000; }
          const minutes = Math.floor(elapsedTime / 60000);
          if (minutes > 0) { elapsedTime -= minutes * 60000; }
          const seconds = Math.floor(elapsedTime / 1000);

          return (
            <li key={i++}>
              {hours < 10 ? '0' + hours : hours}:
              {minutes < 10 ? '0' + minutes : minutes}:
              {seconds < 10 ? '0' + seconds : seconds}
            </li>
          );
        })}
      </ul>
    );
  }

}

export default App;
