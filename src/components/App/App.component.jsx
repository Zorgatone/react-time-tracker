import React, { Component } from 'react';

import { Header } from '../Header';

import './App.style.css';

export class App extends Component {

  render() {
    return (
      <div className="app">
        <Header />
        <i>Hello, World</i>
      </div>
    );
  }

}

export default App;
