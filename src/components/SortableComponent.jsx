import React from 'react';
import SortableTree from 'react-sortable-tree';
import PropTypes from 'prop-types';
import 'react-sortable-tree/style.css';

const SortableComponent = (props) => {
  const {
    components,
    setVisible,
    onExpansionPanelChange,
  } = props;

  const rootComponents = components.filter(
    comp => comp.parentId.length === 0,
  ).reverse();

  const toggleViewBtn = (rowInfo) => {
    setVisible(rowInfo.node.id);
  };

  const nodeClicked = (rowInfo) => {
    console.log('rowInfo: ', rowInfo);
    if (rowInfo.node.visible) onExpansionPanelChange(rowInfo.node);
  };

  const generateNodeProps = (rowInfo) => {
    const rowProps = {
      onClick: () => nodeClicked(rowInfo),
      style: {
        color: 'red',
      },
      buttons: [
         <button key='1'
         style={{
           verticalAlign: 'middle',
           backgroundColor: rowInfo.node.color,
         }}
     >
         {' '}
     </button>,
      ],
    };
    console.log('rowInfo.node.color: ', rowInfo.node.color);
    if (rowInfo.node.route) {
      rowProps.buttons.push(
        <button key='1'
            style={{
              verticalAlign: 'middle',
            }}
            onClick={() => toggleViewBtn(rowInfo)}
        >
            VIEW
        </button>
      );
    }
    return rowProps;
  };

  return (
    <div className="sortable-tree">
      <SortableTree
        style={{ backgroundColor: 'rgb(37, 37, 38)' }}
        treeData={rootComponents}
        canDrag={false}
        onChange={treeData => this.setState({ treeData })}
        generateNodeProps={generateNodeProps}
      />
    </div>
  );
};

export default SortableComponent;

SortableComponent.propTypes = {
  components: PropTypes.array,
};
