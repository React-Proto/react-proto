import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import RouteDisplay from './RouteDisplay.jsx';
import * as actions from '../actions/components';

// import { withStyles } from '@material-ui/core/styles';

const mapDispatchToProps = dispatch => ({
  addRoute: compToAdd => dispatch(actions.addRoute(compToAdd)),
  deleteRoute: compToDelete => dispatch(actions.deleteRoute(compToDelete)),
  setSelectableRoutes: componentId => dispatch(actions.setSelectableRoutes(componentId)),
  setVisible: compId => dispatch(actions.setVisible(compId)),
});

const mapStateToProps = ({ workspace: { components } }) => ({
  components,
});

class RoutesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: '',
      selectedRouteId: null,
    };
  }

  render() {
    const {
      classes,
      component,
      components,
    } = this.props;
    const { pathName } = this.state;

    const handleChange = (event) => {
      event.preventDefault();
      this.setState({
        pathName: event.target.value,
      });
    };

    // getting the selectable routes
    const componentOptions = [
      <option value="" key="">
        None
      </option>,
      ...component.selectableRoutes.map(route => (
        <option value={route.id} key={route.id}>
          {route.title}
        </option>
      )),
    ];

    // wrapper to check if 'None' componenet is selected
    const handleAddRoute = () => {
      if (this.state.selectedRouteId) {
        // new Route Obj to be sent as payload in when dispatch set route action
        const newRoutObj = {
          path: this.state.pathName,
          routerCompId: component.id,
          routeCompId: this.state.selectedRouteId,
        };
        this.props.addRoute(newRoutObj);
        this.props.setSelectableRoutes(component.id);
        this.setState({
          pathName: '',
          selectedRouteId: null,
        });
      }
    };
    const handleDeleteRoute = (compToDelete) => {
      this.props.deleteRoute(compToDelete);
      this.props.setSelectableRoutes(component.id);
    };

    const handleSetRoute = event => this.setState({ selectedRouteId: event.target.value });
    
    const routeList = component.routes.map(route => (
      <RouteDisplay
        key={route.routeCompId}
        routeCompId={route.routeCompId}
        componentTitle={route.routeCompTitle}
        pathName={route.path}
        classes={classes}
        handleDeleteRoute={handleDeleteRoute}
        routerCompId={component.id}
        />
    ));
    return (
      <div>
        <FormControl fullWidth={true}>
          <Grid container alignItems="baseline" align="stretch">
            
            <Grid item xs={10}>
            <InputLabel className={classes.label} htmlFor="stateful">
              Path: /
            </InputLabel>
            </Grid>
            <br></br>
            <Grid item xs={10}>
              <TextField
                id="title-input"
                // label="Path Name"
                placeholder="RouteName"
                margin="normal"
                autoFocus
                onChange={handleChange}
                value={pathName}
                name="pathName"
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
                onClick={handleAddRoute}
              >
                <AddIcon />
              </Button>
            </Grid>

          </Grid>
        </FormControl>
        <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor="parentSelect">
              Route Child
            </InputLabel>
            <Select
              className={classes.light}
              native
              id="componentSelect"
              name="componentName"
              onChange={handleSetRoute}
            >
              {componentOptions}
            </Select>
          </div>
        <br/>
        <div className={classes.label}>
          Routes:
          <br/>
          {routeList}
        </div>
      </div>
    );
  }
}

RoutesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesContainer);

RoutesContainer.propTypes = {
  addRoute: PropTypes.func.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  setSelectableRoutes: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
};
