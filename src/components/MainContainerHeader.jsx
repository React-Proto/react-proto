import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
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
    increaseHeight, decreaseHeight, classes, image, removeImage, updateImage,
  } = props;

  return (
    <div className="main-header">
      <div className="main-header-buttons" style={{ marginRight: 'auto' }}>
        <Tooltip title="zoom in" enterDelay={500} leaveDelay={100}>
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => increaseHeight()}>
            <ZoomInIcon />
          </Button>
        </Tooltip>
        <Tooltip title="zoom out" enterDelay={500} leaveDelay={100}>
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => decreaseHeight()}>
            <ZoomOutIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="main-header-buttons">
        <Tooltip title="remove image" enterDelay={500} leaveDelay={100}>
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => removeImage()}>
            <DeleteOutlineIcon />
          </Button>
        </Tooltip>
        <Tooltip title="update image" enterDelay={500} leaveDelay={100}>
          <Button style={style} disabled={!image} color="default" className={classes.button} onClick={() => updateImage()}>
            <ImageSearchIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

MainContainerHeader.propTypes = {
  increaseHeight: PropTypes.func.isRequired,
  decreaseHeight: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  removeImage: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainContainerHeader);
