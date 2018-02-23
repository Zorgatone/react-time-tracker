import React, { Component } from 'react';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Timer } from '../Timer';

import './App.style.css';

export class App extends Component {

  render() {
    return (
      <div className="app">
        <Header />
        <i>Hello, World</i>
        <Timer />
        <Footer />
      </div>
    );
  }

}

export default App;
