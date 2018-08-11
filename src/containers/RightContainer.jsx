import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleClose } from '../actions/components';
import Snackbars from '../components/Snackbars.jsx';
import RightTabs from '../components/RightTabs.jsx';

const { ipcRenderer } = window.require('electron');

const mapDispatchToProps = dispatch => ({
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

  viewAppDir = () => {
    ipcRenderer.send('view_app_dir', this.props.appDir);
  }

  render() {
    const {
      components, successOpen, errorOpen, handleNotificationClose, appDir,
    } = this.props;

    return (
      <div className='column-right' style={{ width: `${this.props.width}%` }} >
        <RightTabs components={components} />
        <Snackbars
          successOpen={successOpen}
          errorOpen={errorOpen}
          handleNotificationClose={handleNotificationClose}
          msg={appDir}
          viewAppDir={this.viewAppDir}
        />
      </div>
    );
  }
}

RightContainer.propTypes = {
  components: PropTypes.array.isRequired,
  successOpen: PropTypes.bool.isRequired,
  appDir: PropTypes.string,
  errorOpen: PropTypes.bool.isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
