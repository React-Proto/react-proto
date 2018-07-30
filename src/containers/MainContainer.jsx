import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UploadedImage from '../components/UploadedImage.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';

const { ipcRenderer } = require('electron');

class MainContainer extends Component {
  state = {
    image: '',
    height: 300,
    open: false,
  };

  constructor(props) {
    super(props);

    this.main = React.createRef();

    ipcRenderer.on('new-file', (event, file) => {
      this.setState({
        image: file,
      });

      this.uploadedImage = React.createRef();
      this.draggableItems = [];
    });
  }

  increaseHeight = () => {
    console.log(this.main);
    // const children = this.main.current.childNodes[0].childNodes

    // for(let i = 0; i < children.length; i++) {
    //   if(children[i].classList.contains('draggable')) {
    //     console.log(children[i]);
    //   }
    // }

    this.setState({
      height: this.state.height * 1.10,
    });
  }

  decreaseHeight = () => {
    console.log(this.state);
    this.setState({
      height: this.state.height * 0.90,
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
        <div className="main" ref={this.main}>
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

MainContainer.propTypes = {
  components: PropTypes.array.isRequired,
};

const mapStateToProps = store => ({
  components: store.components.components,
});

export default connect(mapStateToProps)(MainContainer);
