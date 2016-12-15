import React, { Component } from 'react';
import logo from './logo.gif';
import './App.css';
import CatGif from'./components/catgif';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" id="logo" />
          <h2>Cat Gif Loader</h2>
        </div>
        <CatGif/>
      </div>
    );
  }
}

export default App;
