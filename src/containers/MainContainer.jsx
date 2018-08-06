import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Stage, Layer, Image, Group,
} from 'react-konva';
import TransformerComponent from '../components/TransformerComponent.jsx';
import Rectangle from '../components/Rectangle.jsx';
import MainContainerHeader from '../components/MainContainerHeader.jsx';

const { ipcRenderer } = require('electron');

class MainContainer extends Component {
  state = {
    image: '',
    open: false,
    scaleX: 1,
    scaleY: 1,
    selectedShapeName: '',
    draggable: false,
    x: 100,
    y: 100,
  };

  constructor(props) {
    super(props);
    this.main = createRef();
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

  handleRectangleClick = (e) => {
    console.log(e.target);
  }

  handleStageDrag = () => {
    const mainWindowHeight = this.main.current.clientHeight;
    const mainWindowWidth = this.main.current.clientWidth;
    const groupX = this.refs.group.attrs.x;
    const groupY = this.refs.group.attrs.y;

    const componentX = (mainWindowWidth / 2) - groupX;
    const componentY = (mainWindowHeight / 2) - groupY;
    this.setState({
      x: componentX,
      y: componentY,
    });
  }

  increaseHeight = () => {
    this.refs.group.to({
      scaleX: this.state.scaleX * 1.5,
      scaleY: this.state.scaleY * 1.5,
      duration: 0.03,
    });

    const mainWindowHeight = this.main.current.clientHeight;
    const mainWindowWidth = this.main.current.clientWidth;
    const groupX = this.refs.group.attrs.x;
    const groupY = this.refs.group.attrs.y;


    const componentX = (mainWindowWidth / 2) - groupX;
    const componentY = (this.main.current.clientHeight / 2) - this.refs.group.attrs.x;

    this.setState({
      scaleX: this.state.scaleX * 1.5,
      scaleY: this.state.scaleY * 1.5,
      x: (this.main.current.clientWidth / 2) - this.refs.group.attrs.x,
      y: (this.main.current.clientHeight / 2) - this.refs.group.attrs.y,
    });
  }

  decreaseHeight = () => {
    this.refs.group.to({
      scaleX: this.state.scaleX * 0.75,
      scaleY: this.state.scaleY * 0.75,
      duration: 0.03,
    });

    const mainWindowHeight = this.main.current.clientHeight;
    const mainWindowWidth = this.main.current.clientWidth;
    const groupX = this.refs.group.attrs.x;
    const groupY = this.refs.group.attrs.y;

    console.log(groupX, groupY);

    console.log(mainWindowHeight, mainWindowWidth);

    const componentX = (mainWindowWidth / 2) - groupX;
    const componentY = (mainWindowHeight / 2) - groupY;

    this.setState({
      scaleX: this.state.scaleX * 0.75,
      scaleY: this.state.scaleY * 0.75,
      x: (this.main.current.clientWidth / 2) - this.refs.group.attrs.x,
      y: (this.main.current.clientHeight / 2) - this.refs.group.attrs.y,
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
          toggleDrag={this.toggleDrag}
        />
        <div className="main" ref={this.main}>
          <Stage
            ref={node => this.stage = node}
            onClick={this.handleStageClick}
            onDragEnd={this.handleStageDrag}
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <Layer>
              <Group ref='group' draggable={draggable}>
                <Image ref='image' image={image} />
                {components.map((rect, i) => <Rectangle
                  x={this.state.x} y={this.state.y} key={i} title={rect.title} color={rect.color}
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
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default MainContainer;
