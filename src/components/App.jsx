import React, { Component } from 'react';
import LeftContainer from '../containers/LeftContainer.jsx';
import MainContainer from '../containers/MainContainer.jsx';
import RightContainer from '../containers/RightContainer.jsx';
// import Rnd from 'react-rnd';
import '../public/styles/style.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>React Proto</header>
        <div className="app-container">
          <LeftContainer />
          <MainContainer />
          <RightContainer />
        </div>
      </div>
    );
  }
}

export default App;
