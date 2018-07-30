import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rnd from 'react-rnd';

class Draggable extends Component {
  state = {
    width: 25,
    height: 25,
    x: 0,
    y: 0
  }

  render() {
    const { title } = this.props;
    return (
      <div className="draggable">
        <Rnd
          size={{ width: this.state.width, height: this.state.height }}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }); }}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              ...position,
            });
          }}
          style={{ border: '2px solid blue', position: 'relative' }}
          bounds={'.image-container'}
        >
          {title}
          {this.state.x}
          {this.state.y}
          {this.state.width}
          {this.state.height}
        </Rnd>
      </div>
    );
  }
}

Draggable.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Draggable;
