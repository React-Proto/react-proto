import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/components';
import KonvaStage from '../components/KonvaStage.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';

const { ipcRenderer } = require('electron');

const mapDispatchToProps = dispatch => ({
  updatePosition: ({ id, x, y }) => dispatch(actions.updatePosition({ id, x, y })),
  handleTransform: (id, {
    x, y, width, height,
  }) => dispatch(actions.handleTransform(id, {
    x, y, width, height,
  })),
  toggleComponetDragging: status => dispatch(actions.toggleDragging(status)),
});

class MainContainer extends Component {
  state = {
    image: '',
    open: false,
    draggable: false,
    scaleX: 1,
    scaleY: 1,
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);

    ipcRenderer.on('new-file', (event, file) => {
      const image = new window.Image();
      image.src = file;
      image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          image,
        });
      };

      // this.uploadedImage = React.createRef();
      this.draggableItems = [];
    });
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.state.image;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image,
      });
    };
  }

  increaseHeight = () => {
    this.setState({
      scaleX: this.state.scaleX * 1.5,
      scaleY: this.state.scaleY * 1.5,
    });
  }

  decreaseHeight = () => {
    this.setState({
      scaleX: this.state.scaleX * 0.75,
      scaleY: this.state.scaleY * 0.75,
    });
  }


  toggleModal = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  removeImage = () => {
    this.setState({
      image: '',
      open: false,
    });
  }

  toggleDrag = () => {
    this.props.toggleComponetDragging(this.state.draggable);
    this.setState({
      draggable: !this.state.draggable,
    });
  }

  updateImage = () => {
    ipcRenderer.send('update-file');
  }

  render() {
    const {
      image, open, draggable, scaleX, scaleY,
    } = this.state;
    const {
      components, updatePosition, handleTransform,
    } = this.props;

    return (
      <div className="main-container">
        <MainContainerHeader
          image={image}
          open={open}
          increaseHeight={this.increaseHeight}
          decreaseHeight={this.decreaseHeight}
          removeImage={this.removeImage}
          updateImage={this.updateImage}
          toggleModal={this.toggleModal}
          toggleDrag={this.toggleDrag}
        />
        <div className="main" ref={this.main}>
          <KonvaStage
            scaleX={scaleX}
            scaleY={scaleY}
            image={image}
            draggable={draggable}
            components={components}
            updatePosition={updatePosition}
            handleTransform={handleTransform}
          />
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  components: PropTypes.array.isRequired,
  updatePosition: PropTypes.func.isRequired,
  handleTransform: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  toggleComponetDragging: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(MainContainer);
