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
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';


const styles = () => ({
  iconSmall: {
    fontSize: 10,
  },
  button: {
    // borderRight: '1px solid grey',
    borderRadius: '0px',
    backgroundColor: '#212121',

    '&:hover > span > svg': {
      color: '#1de9b6',
      transition: 'all .2s ease',
    },
    '&:hover': {
      backgroundColor: '#212121',
    },
    '&:disabled': {
      backgroundColor: '#424242',
    },

    '&:disabled > span > svg': {
      color: '#eee',
      opacity: '0.3',
    },
  },
  buttonDrag: {
    // borderRight: '1px solid grey',
    borderRadius: '0px',
    backgroundColor: '#212121',
    '&:hover > span > svg': {
      color: '#1de9b6',
    },

    '&:hover': {
      backgroundColor: '#212121',
    },

    '&:disabled': {
      backgroundColor: '#424242',
    },

    '&:disabled > span > svg': {
      color: '#eee',
      opacity: '0.3',
    },
  },
  buttonDragDark: {
    backgroundColor: '#1de9b6',
  },
  light: {
    color: '#eee',
    // opacity: '0.7',
  },
  dark: {
    color: '#1de9b6',
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
    toggleClass,
    openWorkspace,
    saveWorkspace,
  } = props;

  return (
    <div className="main-header">
      <div className="main-header-buttons" style={{ marginRight: 'auto' }}>
        <Tooltip title="zoom in">
          <div>
            <Button disabled={!image} color="default" className={classes.button} onClick={increaseHeight}>
              <ZoomInIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="zoom out">
          <div>
            <Button disabled={!image} color="default" className={classes.button} onClick={decreaseHeight}>
              <ZoomOutIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="toggle drag">
          <div>
            <Button disabled={!image} color="default" className={toggleDrag ? classes.buttonDrag : classes.buttonDragDark} onClick={toggleDrag}>
              <OpenWithIcon className={toggleClass ? classes.light : classes.dark} />
            </Button>
          </div>
        </Tooltip>
      </div>
      <div className="main-header-buttons" >
        <Tooltip title="save workspace as">
          <div>
            <Button color="default" className={classes.button} onClick={saveWorkspace}>
              <SaveAltIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title="open workspace">
          <div>
            <Button color="default" className={classes.button} onClick={openWorkspace}>
              <OpenInBrowserIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
      </div>
      <div className="main-header-buttons" >
        <Tooltip title="remove image">
          <div>
            <Button disabled={!image} color="default" className={classes.button} onClick={showImageDeleteModal}>
              <DeleteOutlineIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title={image ? 'update image' : 'upload image'}>
          <div>
            <Button color="default" className={classes.button} onClick={updateImage}>
              <ImageSearchIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
        <Tooltip title={'export'}>
          <div>
            <Button color='default' className={classes.button} disabled={totalComponents < 1} onClick={showGenerateAppModal}>
              <GetAppIcon className={classes.light} />
            </Button>
          </div>
        </Tooltip>
        <div>
          <Button color="default" className={classes.button} onClick={() => collapseColumn()}>
            {rightColumnOpen ? <KeyboardArrowRightIcon
              className={classes.light} /> : <KeyboardArrowLeftIcon className={classes.light}
              />}
          </Button>
        </div>
      </div>
    </div>
  );
};

// style={{ borderLeft: '1px solid grey' }}

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
  toggleClass: PropTypes.bool.isRequired,
  openWorkspace: PropTypes.func.isRequired,
  saveWorkspace: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainContainerHeader);
