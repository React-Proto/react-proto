import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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
  <option
    value=''
    key=''
  >
  </option>,
  ...Object.keys(availablePropTypes).map(type => (
    <option
      value={type}
      key={type}
      style={{ color: '#000'}}
    >
      {type}
    </option>
    ),
  ),
];

class Props extends Component {
  state = {
    propKey: '',
    propValue: '',
    propRequired: false,
    propType: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  }

  togglePropRequired = () => {
    this.setState({
      propRequired: !this.state.propRequired,
    });
  }

  handleAddProp = (event) => {
    event.preventDefault();
    const {
      propKey,
      propValue,
      propRequired,
      propType,
    } = this.state;
    this.props.addProp({
      key: propKey,
      value: propValue,
      required: propRequired,
      type: propType,
    });
    this.setState({
      propKey: '',
      propValue: '',
      propRequired: false,
      propType: '',
    });
  }

  render() {
    const {
      focusComponent,
      classes,
      deleteProp,
      rightColumnOpen,
    } = this.props;

    return <div style={{ display: rightColumnOpen ? 'inline' : 'none' }}> {
      Object.keys(focusComponent).length < 1
        ? <div style={{ marginTop: '20px', marginLeft: '20px' }}>Click a component to view its props.</div>
        : <div className='props-container'>
          <form className='props-input' onSubmit={this.handleAddProp}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextField
                  id='propKey'
                  label='Key'
                  margin='normal'
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
                  id='propValue'
                  label='Value'
                  margin='normal'
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
                  <InputLabel className={classes.light} htmlFor='propType'>Type</InputLabel>
                  <Select
                    native
                    className={classes.light}
                    id='propType'
                    placeholder='title'
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
                  <InputLabel className={classes.light} htmlFor='propRequired'>Required?</InputLabel>
                  <Switch
                    checked={this.state.propRequired}
                    onChange={this.togglePropRequired}
                    value='propRequired'
                    color='secondary'
                    id='propRequired'
                  />
                </div>
              </Grid>
              <Grid item>
                <Button
                  color='primary'
                  aria-label='Add'
                  type='submit'
                  disabled={!this.state.propKey || !this.state.propType}
                  variant='contained'
                  size="large"
                >
                  ADD PROP
                </Button>
              </Grid>
            </Grid>
          </form>
          <div className='chips'>
            {
              focusComponent.props.map(({
                id, type, key, value, required,
              }, index) => (
                  <Chip
                    key={id}
                    avatar={<Avatar className={classes.avatar} >{availablePropTypes[type]}</Avatar>}
                    label={`${key}: ${value}`}
                    onDelete={() => deleteProp({ id, index })}
                    className={classes.chip}
                    elevation={6}
                    color={required ? 'secondary' : 'primary'}
                    deleteIcon={<RemoveCircleOutlineIcon className={classes.icon} />}
                  />
              ))
            }
          </div>
        </div>
    }
    </div>;
  }
}

Props.propTypes = {
  classes: PropTypes.object.isRequired,
  focusComponent: PropTypes.object.isRequired,
  deleteProp: PropTypes.func.isRequired,
  addProp: PropTypes.func.isRequired,
  rightColumnOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Props);
