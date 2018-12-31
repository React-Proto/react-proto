import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Avatar, FormControl, Grid, TextField,
  Button, Select, Chip, Switch, InputLabel, Typography,
} from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  deleteProp, addProp,
} from '../actions/components';

const mapDispatchToProps = dispatch => ({
  deleteProp: ({ id, index }) => dispatch(deleteProp({ id, index })),
  addProp: prop => dispatch(addProp(prop)),
  addPropToSeen: prop => dispatch(addPropToSeen(prop, id)),
});

const mapStateToProps = state => ({
  compProps: state.workspace.compProps,
  components: state.workspace.components,
});

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    color: '#eee',
    backgroundColor: '#333333',
  },
  column: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  icon: {
    fontSize: '20px',
    color: '#eee',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green',
    },
  },
  cssFocused: {},
  input: {
    color: '#eee',
    marginBottom: '10px',
    width: '60%',
  },
  light: {
    color: '#eee',
  },
  avatar: {
    color: '#eee',
    fontSize: '10px',
  },
});

const availablePropTypes = {
  string: 'STR',
  object: 'OBJ',
  array: 'ARR',
  number: 'NUM',
  bool: 'BOOL',
  func: 'FUNC',
  symbol: 'SYM',
  node: 'NODE',
  element: 'ELEM',
};

const typeOptions = [
  <option value="" key="" />,
  ...Object.keys(availablePropTypes).map(type => (
    <option value={type} key={type} style={{ color: '#000' }}>
      {type}
    </option>
  )),
];

class Props extends Component {
  state = {
    propKey: '',
    propValue: '',
    propRequired: false,
    propType: '',
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  };

  togglePropRequired = () => {
    this.setState({
      propRequired: !this.state.propRequired,
    });
  };

  handleAddProp = (event) => {
    event.preventDefault();
    const {
      propKey, propValue, propRequired, propType,
    } = this.state;
    const { focusComponent } = this.props;
    this.props.addProp({
      key: propKey,
      value: propValue,
      required: propRequired,
      type: propType,
      origin: focusComponent.id,
    });
    this.setState({
      propKey: '',
      propValue: '',
      propRequired: false,
      propType: '',
    });
  };

  getDisplayParentProps(comp, parentId) {
    // gets all of the parents from the components object and places into array
    let output = [];
    if (parentId === '') return [];
    output.push(comp.reduce((a, b) => (b.id === parentId ? b : a), { id: '' }));
    while (output[output.length - 1].parentId !== '') {
      output.push(comp.reduce((a, b) => (b.id === output[output.length - 1].parentId ? b : a), { id: '' }));
    }
    output = output.map(el => el.id);
    return output;
  }

  parentPropHandler(event) {
    // adds to seen at in props object in store
    const { id } = event;
    return console.log(id);
    // addPropToSeen({ id }, focusComponent.id);
  }

  deleteHandler() {
    // deletes prop from store if this is origin
    // otherwise removes it from the seenAt array

  }

  render() {
    const {
      focusComponent, classes, deleteProp, rightColumnOpen, compProps, components,
    } = this.props;

    let displayParentProps;
    if (Object.keys(focusComponent).length > 0) {
      console.log('focusComponent: ', focusComponent.id);
      displayParentProps = this.getDisplayParentProps(components, focusComponent.parentId);
    }

    return (
      <div style={{ display: rightColumnOpen ? 'inline' : 'none' }}>
        {' '}
        {Object.keys(focusComponent).length < 1 ? (
          <div style={{ marginTop: '20px', marginLeft: '20px' }}>
            Click a component to view its props.
          </div>
        ) : (
          <div className="props-container">
            <form className="props-input" onSubmit={this.handleAddProp}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <TextField
                    id="propKey"
                    label="Key"
                    margin="normal"
                    autoFocus
                    onChange={this.handleChange}
                    value={this.state.propKey}
                    required
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="propValue"
                    label="Value"
                    margin="normal"
                    onChange={this.handleChange}
                    InputProps={{
                      className: classes.input,
                    }}
                    InputLabelProps={{
                      className: classes.input,
                    }}
                    value={this.state.propValue}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl required>
                    <InputLabel className={classes.light} htmlFor="propType">
                      Type
                    </InputLabel>
                    <Select
                      native
                      className={classes.light}
                      id="propType"
                      placeholder="title"
                      onChange={this.handleChange}
                      value={this.state.propType}
                      required
                    >
                      {typeOptions}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.column}>
                    <InputLabel
                      className={classes.light}
                      htmlFor="propRequired"
                    >
                      Required?
                    </InputLabel>
                    <Switch
                      checked={this.state.propRequired}
                      onChange={this.togglePropRequired}
                      value="propRequired"
                      color="secondary"
                      id="propRequired"
                    />
                  </div>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    aria-label="Add"
                    type="submit"
                    disabled={!this.state.propKey || !this.state.propType}
                    variant="contained"
                    size="large"
                  >
                    ADD PROP
                  </Button>
                </Grid>
              </Grid>
            </form>
            <div className="chips">
            {compProps
              .filter(el => el.origin === focusComponent.id || el.availableAt.indexOf(focusComponent.id) >= 0 || el.displayedAt.indexOf(focusComponent.id) >= 0)
              .map((el) => {
                const {
                  id, key, value, required, type,
                } = el;
                return (
                <Chip
                key={id}
                avatar={
                  <Avatar className = {classes.avatar}>
                    {availablePropTypes[type]}
                  </Avatar>
                }
                label={`${key}: ${value}`}
                onDelete={this.deleteHandler}
                className={classes.chip}
                elevation={6}
                disabled={el.origin !== focusComponent.id || el.availableAt.indexOf(focusComponent.id) < 0}
                color={required ? 'secondary' : 'primary'}
                deleteIcon={
                  <RemoveCircleOutlineIcon className={classes.icon}/>
                }
                />
                );
              })}
            </div>
            <Typography className={classes.label}>Parent Props</Typography>
            {compProps
              .filter(el => displayParentProps.indexOf(el.origin) >= 0)
              .map((el) => {
                const {
                  id, key, value, required, type,
                } = el;
                return (
                <Chip
                key={id}
                avatar={
                  <Avatar className = {classes.avatar}>
                    {availablePropTypes[type]}
                  </Avatar>
                }
                label={`${key}: ${value}`}
                onClick = {this.parentPropHandler}
                className={classes.chip}
                elevation={6}
                disabled={el.origin !== focusComponent.id || el.availableAt.indexOf(focusComponent.id) < 0}
                color={required ? 'secondary' : 'primary'}
                deleteIcon={
                  <RemoveCircleOutlineIcon className={classes.icon}/>
                }
                />
                );
              })}
          </div>
        )}
      </div>
    );
  }
}

Props.propTypes = {
  classes: PropTypes.object.isRequired,
  focusComponent: PropTypes.object.isRequired,
  deleteProp: PropTypes.func.isRequired,
  addProp: PropTypes.func.isRequired,
  rightColumnOpen: PropTypes.bool.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Props);
