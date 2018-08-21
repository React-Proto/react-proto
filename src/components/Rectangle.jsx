import React, { Component } from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

class Rectangle extends Component {
  extractPositionInfo(componentId, target) {
    const transformation = {
      x: target.x(),
      y: target.y(),
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY(),
    };

    this.props.handleTransform(componentId, transformation);
  }

  render() {
    const {
      color, x, y, componentId, draggable, width, height,
    } = this.props;

    return (
      <Rect
        name={componentId}
        x={x}
        y={y}
        componentid={componentId}
        scaleX={1}
        scaleY={1}
        width={width}
        height={height}
        stroke={color}
        strokeWidth={6}
        strokeScaleEnabled={false}
        onTransformEnd={event => this.extractPositionInfo(componentId, event.target)}
        onDragEnd={event => this.extractPositionInfo(componentId, event.target)}
        draggable={draggable}
      />
    );
  }
}

Rectangle.propTypes = {
  // title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleTransform: PropTypes.func.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  componentId: PropTypes.string.isRequired,
  draggable: PropTypes.bool.isRequired,
};

export default Rectangle;
