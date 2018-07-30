import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import * as actions from '../actions/components';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel.jsx';

const mapStateToProps = store => ({
  components: store.components.components,
});

const mapDispatchToProps = dispatch => ({
  addComponent: title => dispatch(actions.addComponent(title)),
  handleColorChange: ({ color, index, id }) => dispatch(actions.updateColor({ color, index, id })),
});

class LeftContainer extends Component {
  state = {
    inputValue: '',
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value.trim(),
    });
  }

  handleAddComponent = () => {
    this.props.addComponent(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  }

  render() {
    const { components, handleColorChange } = this.props;
    const { inputValue } = this.state;

    return (
      <div className='column left'>
        <FormControl fullWidth={true}>
          <Grid container spacing={16} alignItems='baseline' align='stretch'>
            <Grid item xs={10}>
              <TextField
                id='with-placeholder'
                label='Component Name'
                placeholder='AppComponent'
                margin='normal'
                onChange={this.handleChange}
                value={inputValue}
                style={{ width: '95%' }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant='fab' mini color='primary' aria-label='Add' onClick={this.handleAddComponent} disabled={!this.state.inputValue}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormControl>
        <div className='expansionPanel'>
          {
            components.map(
              (component, i) => <LeftColExpansionPanel key={i} index={i} handleColorChange={handleColorChange} { ...component }/>,
            )
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftContainer);

LeftContainer.propTypes = {
  addComponent: PropTypes.func,
  components: PropTypes.array,
};
