import React, { Component } from 'react';
import { Rect } from 'react-konva';


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
    return (
      <Rect
        name={this.props.name}
        x={this.state.x}
        y={this.state.y}
        width={50}
        height={50}
        stroke="#800000"
        shadowBlur={5}
        onClick={this.handleClick}
        onDragEnd={event => this.handleDrag(event)}
        draggable
      />
    );
  }
}
