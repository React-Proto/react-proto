import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  Stage, Layer, Image, Group,
} from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
import Rectangle from './Rectangle.jsx';


class KonvaStage extends Component {
  state = {
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);
    this.main = createRef();
    this.group = createRef();
  }

  handleStageMouseDown = (e) => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.props.openExpansionPanel({});
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const id = e.target.name();
    const rect = this.props.components.find(r => r.id === id);

    if (rect) {
      this.props.openExpansionPanel(rect);
    } else {
      this.props.openExpansionPanel({});
    }
  };

  // handleStageDrag = () => {
  //   // const mainWindowHeight = this.main.current.clientHeight;
  //   // const mainWindowWidth = this.main.current.clientWidth;
  //   // const groupX = this.refs.group.attrs.x;
  //   // const groupY = this.refs.group.attrs.y;

  //   // const componentX = (mainWindowWidth / 2) - groupX;
  //   // const componentY = (mainWindowHeight / 2) - groupY;
  // }

  componentDidMount() {
    this.props.setImage();
  }

  render() {
    const {
      components, handleTransform, image, draggable, scaleX, scaleY, focusComponent,
    } = this.props;
    const { selectedShapeName } = this.state;

    return (
      <Stage
        ref={(node) => {
          this.stage = node;
        }}
        onMouseDown={this.handleStageMouseDown}
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
            {components
              .filter(comp => comp.visible)
              .map((comp, i) => <Rectangle
              draggable={comp.draggable}
              selectedShapeName={selectedShapeName}
              key={i}
              componentId={comp.id}
              x={comp.position.x}
              y={comp.position.y}
              width={comp.position.width}
              height={comp.position.height}
              title={comp.title}
              color={comp.color}
              handleTransform={handleTransform}
            />)}
            <TransformerComponent
              focusComponent={focusComponent}
              selectedShapeName={selectedShapeName}
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
  handleTransform: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  scaleX: PropTypes.number.isRequired,
  scaleY: PropTypes.number.isRequired,
  openExpansionPanel: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  focusComponent: PropTypes.object.isRequired,
};

export default KonvaStage;
