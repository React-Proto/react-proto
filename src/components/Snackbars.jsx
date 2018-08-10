import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from './SnackbarContentWrapper.jsx';

const Snackbars = (props) => {
  const { successOpen, errorOpen, handleNotificationClose } = props;
  return (
    <div>
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
          autoHideDuration={2000}
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
          autoHideDuration={2000}
          onClose={handleNotificationClose}
          variant="error"
          message="There was an error while creating your files"
        />
      </Snackbar>
    </div>
  );
};

Snackbars.propTypes = {
  successOpen: PropTypes.bool.isRequired,
  errorOpen: PropTypes.bool.isRequired,
  handleNotificationClose: PropTypes.func.isRequired,
};

export default Snackbars;
