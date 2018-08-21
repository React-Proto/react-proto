import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '4%',
    minWidth: '500px',
  },
  button: {
    marginTop: '8%',
    height: 'auto',
    marginLeft: '3%',
    borderRadius: '4px',
    float: 'right',
  },
});

const SimpleModal = (props) => {
  const {
    classes,
    open,
    message,
    primBtnLabel,
    secBtnLabel,
    primBtnAction,
    secBtnAction,
    closeModal,
    children = null,
  } = props;

  return (
    <Fragment>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        onClose={closeModal}
        open={open}
      >
        <div style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} className={classes.paper}>
          <Icon
            onClick={closeModal}
            className='closeIcon'
            style={{
              position: 'absolute',
              top: '2%',
              right: '1%',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >close</Icon>
          <Typography variant="title" id="modal-title">
            {message}
          </Typography>
          <div>
            {children}
          </div>
          <div>
            {
              secBtnLabel ? <Button variant='extendedFab' color="secondary" className={classes.button} onClick={secBtnAction}>
                {secBtnLabel}
              </Button> : null
            }
            {
              primBtnLabel ? <Button variant='extendedFab' color="primary" className={classes.button} onClick={primBtnAction}>
                {primBtnLabel}
              </Button> : null
            }
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

SimpleModal.propTypes = {
  open: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  secBtnAction: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  primBtnAction: PropTypes.func,
  children: PropTypes.object,
  message: PropTypes.string,
  primBtnLabel: PropTypes.string,
  secBtnLabel: PropTypes.string,
};

export default withStyles(styles)(SimpleModal);
