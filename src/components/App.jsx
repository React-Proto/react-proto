import React, { Component } from 'react';
import '../public/styles/style.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import AppContainer from '../containers/AppContainer.jsx';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <header>React Proto</header>
          <div>
            <AppContainer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
