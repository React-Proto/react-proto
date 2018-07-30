import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
    classes, open, removeImage, image,
  } = props;

  return (
    <Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            Are you sure you want to delete this image. All associated data will be removed with it.
          </Typography>
          <Button disabled={!image} color="secondary" className={classes.button} onClick={() => removeImage()}>
            Delete
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

SimpleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  removeImage: PropTypes.func.isRequired,
};
export default withStyles(styles)(SimpleModal);
