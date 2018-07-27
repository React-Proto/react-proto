import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';

class SortableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {
          title: 'DrawingComponentComponent',
          expanded: true,
          children: [{ title: 'index' }],
        },
        {
          title: 'DrawingComponentComponent',
          expanded: true,
          children: [{ title: 'MercuryComponent' }, { title: 'Venus' }, { title: 'DrawingComponent' }, { title: 'Mars' }, { title: 'DrawingComponent' }],
        },
      ],
    };
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

export default SortableComponent;
