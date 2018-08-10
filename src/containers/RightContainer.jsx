import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { exportFiles, handleClose } from '../actions/components';
import Snackbars from '../components/Snackbars.jsx';
import RightTabs from '../components/RightTabs.jsx';


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
      <div className='column-right' style={{ width: `${this.props.width}%` }} >
        <RightTabs components={components} />
        <Snackbars
          successOpen={successOpen}
          errorOpen={errorOpen}
          handleNotificationClose={handleNotificationClose}
        />
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
  width: PropTypes.number.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
