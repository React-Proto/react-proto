import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css';
// import './style.css';

class SortableComponents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        {
          title: "App",
          expanded: true,
          children: [{ title: "index" }, { title: "header" }]
        },
        {
          title: "Sun",
          expanded: true,
          children: [{ title: "Mercury" }, { title: "Venus" }, {title: "Earth"}]
        }
      ]
    };
  }

  render() {
    return (
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

export default SortableComponents;