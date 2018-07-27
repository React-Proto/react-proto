import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const Export = (props) => {
  const { classes, exportFiles, componentData } = props;

  return (
    <div className='export'>
      <Button variant="contained" color="primary" className={classes.button} onClick={() => exportFiles(componentData)}>
        Export files
      </Button>
    </div>
  );
};

export default withStyles(styles)(Export);
