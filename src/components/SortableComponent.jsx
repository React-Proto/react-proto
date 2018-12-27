import React from 'react';
import SortableTree from 'react-sortable-tree';
import PropTypes from 'prop-types';
import 'react-sortable-tree/style.css';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import InfoIcon from '@material-ui/icons/InfoOutlined';

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
    onExpansionPanelChange(rowInfo.node);
  };

  const generateNodeProps = (rowInfo) => {
    const rowProps = {
      buttons: [
         <InfoIcon key={rowInfo.node.id}
         className='row_color'
         onClick={() => nodeClicked(rowInfo)}
         style={{
           verticalAlign: 'middle',
           color: rowInfo.node.color,
         }}
     >
     </InfoIcon>,
      ],
    };
    if (rowInfo.node.route) {
      rowProps.buttons.push(
        <VisibilityIcon key='1'
            style={{
              verticalAlign: 'middle',
              color: rowInfo.node.color,
            }}
            onClick={() => toggleViewBtn(rowInfo)}
        >
        </VisibilityIcon>,
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
