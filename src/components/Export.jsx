import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Export = (props) => {
  const { classes, exportFiles, rightColumnOpen } = props;

  return (
    <div className='export' style={{ height: '10%' }}>
      {
        rightColumnOpen ? (
          <Button variant="contained" color="primary" className={classes.button} onClick={exportFiles}>
            Export files
          </Button>
        ) : ''
      }
    </div>
  );
};

Export.propTypes = {
  classes: PropTypes.object.isRequired,
  exportFiles: PropTypes.func.isRequired,
  components: PropTypes.array.isRequired,
  opacity: PropTypes.number.isRequired,
  rightColumnOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Export);
