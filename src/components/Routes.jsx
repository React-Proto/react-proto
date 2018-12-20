import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeName: '',
    };
  }

  render() {
    const { classes, component } = this.props;

    const { routeName } = this.state;

    const handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const handleAddRoute = (event) => {};

    return (
      <div>
        <FormControl fullWidth={true}>
          <Grid container alignItems="baseline" align="stretch">
            <Grid item xs={10}>
              <TextField
                id="title-input"
                label="Add a New Route"
                placeholder="routerComponent"
                margin="normal"
                autoFocus
                onChange={handleChange}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    // Do code here
                    this.handleAddRoute();
                    ev.preventDefault();
                  }
                }}
                value={routeName}
                name="routeName"
                className={classes.light}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  className: classes.input,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="fab"
                mini
                color="primary"
                className={classes.button}
                aria-label="Add"
                onClick={() => console.log('onClick')}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    );
  }
}

Routes.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object,
};

export default Routes;
