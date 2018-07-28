import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as actions from '../actions/components';
import SortableComponent from '../components/SortableComponent.jsx';
import Export from '../components/Export.jsx';

const { ipcRenderer } = window.require('electron');

class RightContainer extends Component {
  state = {

  }

  exportFiles = (data) => {
    ipcRenderer.send('export-files', data);
  }

  render() {
    const { components } = this.props;

    return (
      <div className="column right">
        <Export
          componentData={components}
          exportFiles={this.exportFiles}
          fileSelectedHandler={this.fileSelectedHandler}
        />
        <SortableComponent />
      </div>

    );
  }
}

const mapStateToProps = store => ({
  components: store.components.components,
});

// const mapDispatchToProps = dispatch => ({

// });

RightContainer.propTypes = {
  components: PropTypes.array.isRequired,
};


export default connect(mapStateToProps)(RightContainer);
