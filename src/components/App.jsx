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
