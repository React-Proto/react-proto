import React, { Component } from 'react';
import { Transformer } from 'react-konva';
import PropTypes from 'prop-types';

export default class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  checkNode() {
    const stage = this.transformer.getStage();
    const { focusComponent } = this.props;
    const selectedNode = stage.findOne(`.${focusComponent.id}`);

    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }

  render() {
    return (
      <Transformer
        rotateEnabled={false}
        onMouseUp={this.handleMouseUp}
        ref={(node) => {
          this.transformer = node;
        }}
      />
    );
  }
}

TransformerComponent.propTypes = {
  focusComponent: PropTypes.object,
};
