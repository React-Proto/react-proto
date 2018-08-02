import React, { Component } from 'react';
import AppContainer from '../containers/AppContainer.jsx';
import '../public/styles/style.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header>React Proto</header>
        <div>
          <AppContainer />
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
