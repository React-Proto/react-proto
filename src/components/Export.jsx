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
  const { classes, exportFiles, createApplication } = props;

  return (
    <div className='export'>
      <Button size='small' variant="contained" color="primary" className={classes.button} onClick={exportFiles}>
        Generate Files
      </Button>
      <Button size='small' variant="contained" color="primary" className={classes.button} onClick={createApplication}>
        Create Application
      </Button>
    </div>
  );
};

Export.propTypes = {
  classes: PropTypes.object.isRequired,
  exportFiles: PropTypes.func.isRequired,
  createApplication: PropTypes.func.isRequired,
  components: PropTypes.array.isRequired,
};

export default withStyles(styles)(Export);
