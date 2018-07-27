import React, { Component } from 'react';
import UploadedImage from '../components/UploadedImage.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';

const { ipcRenderer } = require('electron');

export default class MainContainer extends Component {
  state = {
    image: '',
    height: 800,
  };

  constructor(props) {
    super(props);

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

  removeImage = () => {
    this.setState({
      image: '',
    });
  }

  updateImage = () => {
    console.log('update image');
  }

  render() {
    const { image, height } = this.state;

    return (
      <div className="main-container">
        <MainContainerHeader
          image={image}
          increaseHeight={this.increaseHeight}
          decreaseHeight={this.decreaseHeight}
          removeImage={this.removeImage}
          updateImage={this.updateImage}

        />
        <div className="main">
          <UploadedImage
            height={height}
            image={image}
          />
        </div>
      </div>
    );
  }
}
