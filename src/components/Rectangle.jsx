import React, { Component } from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

export default class Rectangle extends Component {
  render() {
    const {
      title, color, x, y, updatePosition, id, handleTransform,
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
        onTransformEnd={event => handleTransform(id,
          event.target.x(),
          event.target.y(),
          event.target.width() * event.target.scaleX(),
          event.target.height() * event.target.scaleY())}
        onDragEnd={event => updatePosition(id, event.target.attrs.x, event.target.attrs.y)}
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
