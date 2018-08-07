import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Stage, Layer, Image, Group,
} from 'react-konva';
import * as actions from '../actions/components';
import TransformerComponent from '../components/TransformerComponent.jsx';
import Rectangle from '../components/Rectangle.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';

const { ipcRenderer } = require('electron');

const mapDispatchToProps = dispatch => ({
  updatePosition: ({ id, x, y }) => dispatch(actions.updatePosition({ id, x, y })),
  handleTransform: ({
    id, x, y, width, height,
  }) => dispatch(actions.handleTransform({
    id, x, y, width, height,
  })),
});

class MainContainer extends Component {
  state = {
    image: '',
    open: false,
    scaleX: 1,
    scaleY: 1,
    selectedShapeName: '',
    draggable: false,
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);
    this.main = createRef();
    this.group = createRef();
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

      this.uploadedImage = React.createRef();
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

  handleStageClick = (e) => {
    this.setState({
      selectedShapeName: e.target.name(),
    });
  };

  handleStageDrag = () => {
    // const mainWindowHeight = this.main.current.clientHeight;
    // const mainWindowWidth = this.main.current.clientWidth;
    // const groupX = this.refs.group.attrs.x;
    // const groupY = this.refs.group.attrs.y;

    // const componentX = (mainWindowWidth / 2) - groupX;
    // const componentY = (mainWindowHeight / 2) - groupY;
    // console.log(componentX, componentY);
  }

  increaseHeight = () => {
    this.group.to({
      scaleX: this.state.scaleX * 1.5,
      scaleY: this.state.scaleY * 1.5,
      duration: 0.03,
    });


    this.setState({
      scaleX: this.state.scaleX * 1.5,
      scaleY: this.state.scaleY * 1.5,
    });
  }

  decreaseHeight = () => {
    this.group.to({
      scaleX: this.state.scaleX * 0.75,
      scaleY: this.state.scaleY * 0.75,
      duration: 0.03,
    });

    this.setState({
      scaleX: this.state.scaleX * 0.75,
      scaleY: this.state.scaleY * 0.75,
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

  toggleDrag = () => {
    this.setState({
      draggable: !this.state.draggable,
    });
  }

  updateImage = () => {
    ipcRenderer.send('update-file');
  }

  render() {
    const { image, open, draggable } = this.state;
    const { components, updatePosition, handleTransform } = this.props;

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
          toggleDrag={this.toggleDrag}
        />
        <div className="main" ref={this.main}>
          <Stage
            ref={(node) => {
              this.stage = node;
            }}
            onClick={this.handleStageClick}
            onDragEnd={this.handleStageDrag}
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <Layer>
              <Group
                ref={(node) => {
                  this.group = node;
                }}
                draggable={draggable}>
                <Image image={image} />
                {components.map((comp, i) => <Rectangle
                  key={i}
                  id={comp.id}
                  x={comp.position.x}
                  y={comp.position.y}
                  title={comp.title}
                  color={comp.color}
                  updatePosition={updatePosition}
                  handleTransform={handleTransform}
                />)}
                <TransformerComponent
                  selectedShapeName={this.state.selectedShapeName}
                />
              </Group>
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  components: PropTypes.array.isRequired,
  updatePosition: PropTypes.func.isRequired,
  handleTransform: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default connect(null, mapDispatchToProps)(MainContainer);
