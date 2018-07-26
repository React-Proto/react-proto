import React, { Component } from 'react';
import Rnd from 'react-rnd';
import LeftContainer from '../containers/LeftContainer';
import MainContainer from '../containers/MainContainer';
import RightContainer from '../containers/RightContainer';

// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import '../style.css';


class App extends Component {

  render() {
    const style = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'solid 2px green',
    };
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
