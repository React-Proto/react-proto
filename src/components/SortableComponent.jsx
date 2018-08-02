import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import PropTypes from 'prop-types';
import 'react-sortable-tree/style.css';

class SortableComponent extends Component {
  render() {
    const rootComponents = this.props.components.filter(
      comp => comp.parentId.length === 0,
    );
    return (
      <div style={{ height: '100%' }}>
        <SortableTree
          treeData={rootComponents}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

export default SortableComponent;

SortableComponent.propTypes = {
  components: PropTypes.array,
};
