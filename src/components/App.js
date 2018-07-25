import React, { Component } from 'react';
import Rnd from 'react-rnd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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
      <div>
        <Grid container spacing={0}>
          <Grid item xs={3}>
            <Paper>xs=3</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>asdfas=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>f=3</Paper>
          </Grid>
        </Grid>
        <h1>My react grapple</h1>
      </div>
    );
  }
}

export default App;
