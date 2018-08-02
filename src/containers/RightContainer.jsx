import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
// import * as actions from '../actions/components';
import SortableComponent from '../components/SortableComponent.jsx';
import Export from '../components/Export.jsx';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper.jsx';

const { ipcRenderer } = window.require('electron');

class RightContainer extends Component {
  state = {
    successOpen: false,
    errorOpen: false,
  }

  constructor() {
    super();
    ipcRenderer.on('file_notification', (event, data) => {
      if (data === 'success') {
        this.handleOpenSuccess();
      } else {
        this.handleOpenError();
      }
    });
  }

  handleOpenSuccess() {
    this.setState({
      successOpen: !this.state.successOpen,
    });
  }

  handleOpenError() {
    this.setState({
      errorOpen: !this.state.errorOpen,
    });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ successOpen: false, errorOpen: false });
  };


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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.successOpen}
          autoHideDuration={2000}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Your files were successfully created"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.errorOpen}
          autoHideDuration={2000}
        >
          <SnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            message="There was an error while creating your files"
          />
        </Snackbar>
        <SortableComponent components={components} />
      </div>

    );
  }
}

RightContainer.propTypes = {
  components: PropTypes.array.isRequired,
};

export default RightContainer;
