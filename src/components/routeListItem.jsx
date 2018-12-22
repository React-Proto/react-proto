import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const RouteListItem = ({
  pathName, 
  componentTitle, 
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

export default RouteListItem;
