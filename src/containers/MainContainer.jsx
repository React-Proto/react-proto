import React, { Component } from 'react';
import UploadedImage from '../components/UploadedImage.jsx';

const { ipcRenderer } = require('electron');

export default class MainContainer extends Component {
  state = {
    image: '',
    height: 800,
  };

  constructor() {
    super();

    ipcRenderer.on('new-file', (event, file) => {
      this.setState({
        image: file,
      });

      this.uploadedImage = React.createRef();
    });
  }

  increaseHeight = () => {
    this.setState({
      height: this.state.height * 1.25,
    });
  }

  decreaseHeight = () => {
    this.setState({
      height: this.state.height * 0.75,
    });
  }

  render() {
    const { image, height } = this.state;

    return (
      <div className="main">
        <UploadedImage
          height={height}
          image={image}
          increaseHeight={this.increaseHeight}
          decreaseHeight={this.decreaseHeight}
        />
        {image ? <div className="buttons">
          <button className="btn increase" onClick={() => this.increaseHeight()}>+</button>
          <button className="btn decrease" onClick={() => this.decreaseHeight()}>-</button>
        </div> : ''}
      </div>
    );
  }
}
