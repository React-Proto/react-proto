import React, { Component } from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

export default class Rectangle extends Component {
  state = {
    x: 110,
    y: 120,
  }

  handleDrag(event) {
    this.setState({
      x: event.target.attrs.x,
      y: event.target.attrs.y,

    });
  }

  render() {
    const { name, color } = this.props;
    const { x, y } = this.state;

    return (
      <Rect
        name={name}
        x={x}
        y={y}
        width={50}
        height={50}
        stroke={color}
        shadowBlur={2}
        onClick={this.handleClick}
        onDragEnd={event => this.handleDrag(event)}
        draggable
      />
    );
  }
}

Rectangle.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
