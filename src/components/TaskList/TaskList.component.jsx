import React, { Component } from 'react';

import { Task } from '../Task';

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
    return this.state.tasks.reverse()
      .map((duration, index) => (
        <Task key={index} duration={duration}></Task>
      ));
  }

  addTask(task) {
    this.setState(Object.assign({}, this.state, {
      tasks: this.state.tasks.concat(task)
    }));
  }

}

export default TaskList;
