import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const routeListItem = ({
  routeName, 
  componentName, 
  id, 
  deleteRoute,
  classes,
}) => (
  <div className="routeListItem">
    /home
    HOME
    <IconButton
      className={classes.button}
      onClick={() => {
        deleteRoute({
          id,
        });
      }}
      aria-label='Delete'>
      <DeleteIcon className={classes.light} />
    </IconButton>
  </div>
);

export default routeListItem;
