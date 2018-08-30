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
          <div>
            <header style={{ height: '40px', width: '100%' }}>React Proto</header>
            <AppContainer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
