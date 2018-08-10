import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import { exportFiles, handleClose, createApplication } from '../actions/components';
import SortableComponent from '../components/SortableComponent.jsx';
import Export from '../components/Export.jsx';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper.jsx';


const { ipcRenderer } = window.require('electron');

const mapDispatchToProps = dispatch => ({
  exportFiles: ({ components, path }) => dispatch(exportFiles({ components, path })),
  createApplication: ({ path, components }) => dispatch(createApplication({ path, components })),
  handleNotificationClose: () => dispatch(handleClose()),
});

const mapStateToProps = store => ({
  successOpen: store.workspace.successOpen,
  errorOpen: store.workspace.errorOpen,
  appDir: store.workspace.appDir,
});

class RightContainer extends Component {
  state = {
    successOpen: false,
    errorOpen: false,
  }

  constructor(props) {
    super(props);

    ipcRenderer.on('created_folder', (event, path) => {
      const { components } = this.props;
      this.props.exportFiles({ components, path, event });
    });

    ipcRenderer.on('app_dir_selected', (event, path) => {
      const { components } = this.props;
      this.props.createApplication({ path, components });
    });
  }

  exportFiles = () => {
    ipcRenderer.send('export_files');
  }

  chooseAppDir = () => {
    ipcRenderer.send('choose_app_dir');
  }

  viewAppDir = () => {
    ipcRenderer.send('view_app_dir', this.props.appDir);
  }

  render() {
    const {
      components, successOpen, errorOpen, handleNotificationClose,
    } = this.props;
    const successMessage = <div>Your files were successfully created. <Button
      variant='fab'
      mini color='primary'
      aria-label='View app directory'
      onClick={this.viewAppDir}
    >View</Button></div>;
    const errorMessage = `There was an error while creating your files. ${this.props.appDir}`;

    return (
      <div className="column right">
        <Export
          components={components}
          exportFiles={this.exportFiles}
          createApplication={this.chooseAppDir}
          fileSelectedHandler={this.fileSelectedHandler}
        />
        <SortableComponent components={components} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={successOpen}
          autoHideDuration={5000}
          onClose={handleNotificationClose}
        >
          <SnackbarContentWrapper
            onClose={handleNotificationClose}
            variant="success"
            message={successMessage}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={errorOpen}
          autoHideDuration={5000}
          onClose={handleNotificationClose}
        >
          <SnackbarContentWrapper
            onClose={handleNotificationClose}
            variant="error"
            message={errorMessage}
          />
        </Snackbar>
      </div>

    );
  }
}

RightContainer.propTypes = {
  components: PropTypes.array.isRequired,
  successOpen: PropTypes.bool.isRequired,
  appDir: PropTypes.string,
  errorOpen: PropTypes.bool.isRequired,
  exportFiles: PropTypes.func.isRequired,
  createApplication: PropTypes.func.isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
