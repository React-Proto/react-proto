import React, { Component } from 'react';
import Rnd from 'react-rnd';
import LeftContainer from '../containers/LeftContainer';
import MainContainer from '../containers/MainContainer';
import RightContainer from '../containers/RightContainer';
// import Rnd from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../public/styles/style.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <LeftContainer />
        <MainContainer />
        <RightContainer />
      </div>
    );
  }
}

export default App;
