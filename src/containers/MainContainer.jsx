import React, { Component } from 'react';
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
  };

  constructor(props) {
    super(props);

    this.main = React.createRef();

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

  increaseHeight = () => {
    this.refs.group.to({
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
    this.refs.group.to({
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
    const { image, open } = this.state;
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
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <Layer>
              <Group ref='group' draggable={this.state.draggable}>
                <Image ref='image' image={this.state.image} />
                {components.map((rect, i) => <Rectangle key={i} name={rect.title} color={rect.color} />)}
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
};

export default MainContainer;
