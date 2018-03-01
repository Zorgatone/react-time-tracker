import React, { Component } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Timer } from '../Timer';
import { TaskList } from '../TaskList';

import './App.style.css';

export class App extends Component {

  constructor() {
    super();

    this.state = {
      startOnLoad : false
    };
  }

  render() {
    return (
      <div className="app">
        <Header title="Time tracker app" />
        <div className="app-body">
          <Timer
            start={this.state.startOnLoad}
            ref={(timer) => { this.timer = timer; }}
            onComplete={this.onComplete.bind(this)}
          />
          <TaskList ref={(taskList) => { this.taskList = taskList; }} />
        </div>
        <Footer />
      </div>
    );
  }

  onComplete(elapsedTime) {
    this.taskList.addTask(elapsedTime);
  }

}

export default App;
