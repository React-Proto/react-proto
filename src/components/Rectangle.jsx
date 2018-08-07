import React, { Component } from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

export default class Rectangle extends Component {
  extractPositionInfo(id, target) {
    const transformation = {
      id,
      x: target.x(),
      y: target.y(),
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY(),
    };

    this.props.handleTransform(transformation);
  }

  render() {
    const {
      title, color, x, y, updatePosition, id,
    } = this.props;

    return (
      <Rect
        name={title}
        x={x}
        y={y}
        width={50}
        height={50}
        stroke={color}
        strokeWidth={4}
        strokeScaleEnabled={false}
        onTransformEnd={event => this.extractPositionInfo(id, event.target)}
        onDragEnd={event => updatePosition({ id, x: event.target.attrs.x, y: event.target.attrs.y })}
        draggable
      />
    );
  }
}

Rectangle.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  updatePosition: PropTypes.func.isRequired,
  handleTransform: PropTypes.func.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  id: PropTypes.string.isRequired,
};
