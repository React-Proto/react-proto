import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const RouteDisplay = ({
  componentTitle,
  pathName,
  routeCompId,
  deleteRoute,
  classes,
  routerCompId,
}) => (
  <div className="routeListItem">
    Path: / {pathName}
    Component: {componentTitle}
    <IconButton
      className={classes.button}
      onClick={() => {
        deleteRoute({
          routeCompId,
          routerCompId,
        });
      }}
      aria-label='Delete'>
      <DeleteIcon className={classes.light} />
    </IconButton>
  </div>
);

export default RouteDisplay;

RouteDisplay.propTypes = {
  deleteRoute: PropTypes.func.isRequired,
  routerCompId: PropTypes.string.isRequired,
  componentTitle: PropTypes.string.isRequired,
  pathName: PropTypes.string.isRequired,
  routeCompId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
