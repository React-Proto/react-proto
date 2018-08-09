import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const SimpleModal = (props) => {
  const {
    classes, open, action, toggleModal, children, message, primaryButtonLabel, secondaryButtonLabel,
  } = props;

  return (
    <Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <div style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            {message}
          </Typography>
          {children || ''}
          <Button color="primary" className={classes.button} onClick={() => toggleModal()}>
            {primaryButtonLabel}
          </Button>
          <Button color="secondary" className={classes.button} onClick={action}>
            {secondaryButtonLabel}
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

SimpleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  action: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.object,
  message: PropTypes.string.isRequired,
  primaryButtonLabel: PropTypes.string.isRequired,
  secondaryButtonLabel: PropTypes.string.isRequired,
};
export default withStyles(styles)(SimpleModal);
