import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const RouteDisplay = ({
  componentTitle,
  pathName,
  routeCompId,
  handleDeleteRoute,
  classes,
  routerCompId,
}) => (
  <Grid container alignItems="baseline" align="stretch">
    <Grid item xs={10} className={classes.light} >
      Path: / {pathName}
      <br/>
      Component: {componentTitle}
    </Grid>
    <Grid item xs={2}>
    <IconButton
      className={classes.button}
      onClick={() => {
        handleDeleteRoute({
          routeCompId,
          routerCompId,
        });
      }}
      aria-label='Delete'>
      <DeleteIcon />
    </IconButton>
    </Grid>
  </Grid>
);

export default RouteDisplay;

RouteDisplay.propTypes = {
  handleDeleteRoute: PropTypes.func.isRequired,
  routerCompId: PropTypes.string.isRequired,
  componentTitle: PropTypes.string.isRequired,
  pathName: PropTypes.string.isRequired,
  routeCompId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};
