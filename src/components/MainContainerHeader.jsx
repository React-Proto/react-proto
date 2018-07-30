import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SimpleModal from './SimpleModal.jsx';
// import classNames from 'classnames';

const style = {
  borderRight: '1px solid grey',
  borderRadius: '0px',
};

const styles = theme => ({
  iconSmall: {
    fontSize: 12,
  },
});

const MainContainerHeader = (props) => {
  const {
    increaseHeight, decreaseHeight, classes, image, removeImage, updateImage, open, handleOpen,
  } = props;

  return (
    <div className="main-header">
      <div className="main-header-buttons" style={{ marginRight: 'auto' }}>
        <Tooltip title="zoom in">
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => increaseHeight()}>
            <ZoomInIcon />
          </Button>
        </Tooltip>
        <Tooltip title="zoom out">
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => decreaseHeight()}>
            <ZoomOutIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="main-header-buttons" style={{ borderLeft: '1px solid grey' }}>
        <Tooltip title="remove image">
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => handleOpen()}>
            <DeleteOutlineIcon />
          </Button>
        </Tooltip>
        <Tooltip title="update image">
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => updateImage()}>
            <ImageSearchIcon />
          </Button>
        </Tooltip>
      </div>
      <SimpleModal open={open} removeImage={removeImage} image={image} />
    </div>
  );
};

MainContainerHeader.propTypes = {
  open: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  increaseHeight: PropTypes.func.isRequired,
  decreaseHeight: PropTypes.func.isRequired,
  removeImage: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainContainerHeader);
