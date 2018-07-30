import React from 'react';
import PropTypes from 'prop-types';
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

Export.propTypes = {
  classes: PropTypes.object.isRequired,
  exportFiles: PropTypes.func.isRequired,
  componentData: PropTypes.array.isRequired,
};

export default withStyles(styles)(Export);
