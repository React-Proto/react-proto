import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from './SnackbarContentWrapper.jsx';

const Snackbars = (props) => {
  const {
    successOpen, errorOpen, handleNotificationClose, msg, viewAppDir,
  } = props;
  const successMsg = <div>Your files were successfully created. <Button
      variant='fab'
      mini
      aria-label='View app directory'
      onClick={viewAppDir}
    >View</Button></div>;
  const errMsg = `There was an error while creating your files. ${msg}`;
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={successOpen}
        autoHideDuration={5000}
      >
        <SnackbarContentWrapper
          onClose={handleNotificationClose}
          variant="success"
          message={successMsg}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={errorOpen}
        autoHideDuration={5000}
      >
        <SnackbarContentWrapper
          onClose={handleNotificationClose}
          variant="error"
          message={errMsg}
        />
      </Snackbar>
    </div>
  );
};

Snackbars.propTypes = {
  successOpen: PropTypes.bool.isRequired,
  errorOpen: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  viewAppDir: PropTypes.func.isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
};

export default Snackbars;
