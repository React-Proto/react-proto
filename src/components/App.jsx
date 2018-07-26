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

// <Grid container spacing={0}>
// <Grid item xs={3}>
//   <Paper>xs=3</Paper>
// </Grid>
// <Grid item xs={6}>
//   <Paper>asdfas=6</Paper>
// </Grid>
// <Grid item xs={3}>
//   <Paper>f=3</Paper>
// </Grid>
// </Grid>
// <h1>My react grapple</h1>
