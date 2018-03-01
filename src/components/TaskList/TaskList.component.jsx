import React, { Component } from 'react';

import './TaskList.style.css';

export class TaskList extends Component {

  constructor() {
    super();

    this.state = {
      tasks: []
    };
  }

  render() {
    return (
      <div className="task-list">
        <ul className="tasks">
          {this.renderTasks()}
        </ul>
      </div>
    );
  }

  renderTasks() {
    return this.state.tasks.map((elapsedTime, index) => {
      const hours = Math.floor(elapsedTime / 3600000);
      if (hours > 0) { elapsedTime -= hours * 3600000; }
      const minutes = Math.floor(elapsedTime / 60000);
      if (minutes > 0) { elapsedTime -= minutes * 60000; }
      const seconds = Math.floor(elapsedTime / 1000)

      return (
        <li key={index}>
          {hours < 10 ? '0' + hours : hours}:
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </li>
      );
    });
  }

  addTask(task) {
    this.setState(Object.assign({}, this.state, {
      tasks: this.state.tasks.concat(task)
    }));
  }

}

export default TaskList;
