import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Stage, Layer, Image, Group,
} from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
import Rectangle from './Rectangle.jsx';


class KonvaStage extends Component {
  state = {
    selectedShapeName: '',
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);
    this.main = createRef();
    this.group = createRef();
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


  render() {
    const {
      components, updatePosition, handleTransform, image, draggable, scaleX, scaleY,
    } = this.props;

    return (
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
            scaleX={scaleX}
            scaleY={scaleY}
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
    );
  }
}

KonvaStage.propTypes = {
  draggable: PropTypes.bool.isRequired,
  components: PropTypes.array.isRequired,
  updatePosition: PropTypes.func.isRequired,
  handleTransform: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
};

export default KonvaStage;
