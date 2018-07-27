import React, { Component } from 'react';
import SortableComponent from '../components/SortableComponent.jsx';
import Export from '../components/Export.jsx';

const { ipcRenderer } = window.require('electron');

export default class RightContainer extends Component {
  state = {

  }

  fileSelectedHandler = (event) => {
    console.log(event);
  }

  exportFiles = (data) => {
    ipcRenderer.send('export-files', data);
  }

  render() {
    const componentData = [
      {
        name: 'Button',
        state: true,
      },
      {
        name: 'Card',
        state: false,
      },
      {
        name: 'Container',
        state: true,
      },
    ];
    return (
      <div className="column right">
        <Export
          componentData={componentData}
          exportFiles={this.exportFiles}
          fileSelectedHandler={this.fileSelectedHandler}
        />
        <SortableComponent />
      </div>

    );
  }
}
