import React, { Component } from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

export default class Rectangle extends Component {
  state = {
    x: this.props.x,
    y: this.props.y,
  }

  handleDrag(event) {
    this.setState({
      x: event.target.attrs.x,
      y: event.target.attrs.y,
    });
  }

  render() {
    const { title, color } = this.props;
    const { x, y } = this.state;
    return (
      <Rect
        name={title}
        x={x}
        y={y}
        width={50}
        height={50}
        stroke={color}
        strokeWidth={2}
        onClick={this.handleClick}
        onDragEnd={event => this.handleDrag(event)}
        draggable
      />
    );
  }
}

Rectangle.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,

};
