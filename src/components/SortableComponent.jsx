import React from 'react';
import SortableTree from 'react-sortable-tree';
import PropTypes from 'prop-types';
import 'react-sortable-tree/style.css';

const SortableComponent = (props) => {
  const rootComponents = props.components.filter(
    comp => comp.parentId.length === 0,
  );
  return (
    <div className="sortable-tree">
      <SortableTree
        style={{ backgroundColor: 'rgb(37, 37, 38)' }}
        treeData={rootComponents}
        canDrag={false}
        onChange={treeData => this.setState({ treeData })}
      />
    </div>
  );
};

export default SortableComponent;

SortableComponent.propTypes = {
  components: PropTypes.array,
};
