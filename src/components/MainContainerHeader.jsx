import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const style = {
  button: {
    borderRight: '1px solid grey',
    borderRadius: '0px',
  },
};

const styles = () => ({
  iconSmall: {
    fontSize: 10,
  },
});

const MainContainerHeader = (props) => {
  const {
    increaseHeight,
    decreaseHeight,
    classes,
    image,
    showImageDeleteModal,
    updateImage,
    toggleDrag,
    totalComponents,
    showGenerateAppModal,
    collapseColumn,
    rightColumnOpen,
  } = props;

  return (
    <div className="main-header">
      <div className="main-header-buttons" style={{ marginRight: 'auto' }}>
        <Tooltip title="zoom in">
          <div>
            <Button style={style.button} disabled={!image} color="default" className={classes.button} onClick={increaseHeight}>
              <ZoomInIcon />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="zoom out">
          <div>
            <Button style={style.button} disabled={!image} color="default" className={classes.button} onClick={decreaseHeight}>
              <ZoomOutIcon />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="toggle drag">
          <div>
            <Button style={style.button} disabled={!image} color="default" className={classes.button} onClick={toggleDrag}>
              <OpenWithIcon />
            </Button>
          </div>
        </Tooltip>
      </div>
      <div className="main-header-buttons" style={{ borderLeft: '1px solid grey' }}>
        <Tooltip title="remove image">
          <div>
            <Button style={style.button} disabled={!image} color="default" className={classes.button} onClick={showImageDeleteModal}>
              <DeleteOutlineIcon />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title={image ? 'update image' : 'upload image'}>
          <div>
            <Button style={style.button} color="default" className={classes.button} onClick={updateImage}>
              <ImageSearchIcon />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title={'export'}>
          <div>
            <Button style={style.button} color='default' className={classes.button} disabled={totalComponents < 1} onClick={showGenerateAppModal}>
              <GetAppIcon />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title={rightColumnOpen ? 'close' : 'open'}>
          <div>
            <Button style={style.button} color="default" className={classes.button} onClick={() => collapseColumn()}>
              {rightColumnOpen ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

MainContainerHeader.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  classes: PropTypes.object.isRequired,
  increaseHeight: PropTypes.func.isRequired,
  decreaseHeight: PropTypes.func.isRequired,
  showImageDeleteModal: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
  toggleDrag: PropTypes.func.isRequired,
  showGenerateAppModal: PropTypes.func.isRequired,
  totalComponents: PropTypes.number.isRequired,
  collapseColumn: PropTypes.func.isRequired,
  rightColumnOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MainContainerHeader);
