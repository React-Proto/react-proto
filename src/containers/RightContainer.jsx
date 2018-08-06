import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { exportFiles, handleClose } from '../actions/components';
import SortableComponent from '../components/SortableComponent.jsx';
import Export from '../components/Export.jsx';
import SnackbarContentWrapper from '../components/SnackbarContentWrapper.jsx';


const { ipcRenderer } = window.require('electron');

const mapDispatchToProps = dispatch => ({
  exportFiles: ({ components, path }) => dispatch(exportFiles({ components, path })),
  handleNotificationClose: () => dispatch(handleClose()),
});

const mapStateToProps = store => ({
  successOpen: store.components.successOpen,
  errorOpen: store.components.errorOpen,
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
  }


  exportFiles = () => {
    ipcRenderer.send('export_files');
  }

  render() {
    const {
      components, successOpen, errorOpen, handleNotificationClose,
    } = this.props;

    return (
      <div className="column right">
        <Export
          components={components}
          exportFiles={this.exportFiles}
          fileSelectedHandler={this.fileSelectedHandler}
        />
        <SortableComponent components={components} />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={successOpen}
          autoHideDuration={2000}
        >
          <SnackbarContentWrapper
            onClose={handleNotificationClose}
            variant="success"
            message="Your files were successfully created"
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={errorOpen}
          autoHideDuration={2000}
        >
          <SnackbarContentWrapper
            onClose={handleClose}
            variant="error"
            message="There was an error while creating your files"
          />
        </Snackbar>
      </div>

    );
  }
}

RightContainer.propTypes = {
  components: PropTypes.array.isRequired,
  successOpen: PropTypes.bool.isRequired,
  errorOpen: PropTypes.bool.isRequired,
  exportFiles: PropTypes.func.isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
