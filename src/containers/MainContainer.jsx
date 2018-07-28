import React, { Component } from 'react';
import { connect } from 'react-redux';
import UploadedImage from '../components/UploadedImage.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';

const { ipcRenderer } = require('electron');

class MainContainer extends Component {
  state = {
    image: '',
    height: 800,
    open: false,
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

  handleOpen = () => {
    this.setState({
      open: true,
    });
  }

  removeImage = () => {
    this.setState({
      image: '',
      open: false,
    });
  }

  updateImage = () => {
    ipcRenderer.send('update-file');
  }

  render() {
    const { image, height, open } = this.state;
    const { components } = this.props;

    return (
      <div className="main-container">
        <MainContainerHeader
          image={image}
          open={open}
          increaseHeight={this.increaseHeight}
          decreaseHeight={this.decreaseHeight}
          removeImage={this.removeImage}
          updateImage={this.updateImage}
          handleOpen={this.handleOpen}
        />
        <div className="main">
          <UploadedImage
            height={height}
            image={image}
            components={components}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  components: store.components.components,
});

export default connect(mapStateToProps)(MainContainer);
