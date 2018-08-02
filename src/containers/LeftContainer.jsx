import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel.jsx';
import * as actions from '../actions/components';

const mapDispatchToProps = dispatch => ({
  addComponent: ({ title }) => dispatch(actions.addComponent({ title })),
  updateComponent:
  ({
    id, index, parent = null, newParentId = null, color = null, stateful = null,
  }) => dispatch(actions.updateComponent({
    id, index, parent, newParentId, color, stateful,
  })),
  deleteComponent: ({
    index, id, parent,
  }) => dispatch(actions.deleteComponent({ index, id, parent })),
});

class LeftContainer extends Component {
  state = {
    componentName: '',
    panelExpanded: '',
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.trim(),
    });
  }

  handleExpansionPanelChange = panel => (event, expanded) => {
    this.setState({
      panelExpanded: expanded ? panel : false,
    });
  }

  handleAddComponent = () => {
    this.props.addComponent({ title: this.state.componentName });
    this.setState({
      componentName: '',
    });
  }

  render() {
    const {
      components,
      updateComponent,
      deleteComponent,
    } = this.props;
    const { componentName, panelExpanded } = this.state;

    const componentsExpansionPanel = components.map(
      (component, i) => <LeftColExpansionPanel
          key={component.id}
          index={i}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
          component={component}
          expanded={panelExpanded}
          onExpansionPanelChange={this.handleExpansionPanelChange}
      />,
    );

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
                value={componentName}
                name='componentName'
                style={{ width: '95%' }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant='fab'
                mini color='primary'
                aria-label='Add'
                onClick={this.handleAddComponent}
                disabled={!this.state.componentName}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </FormControl>
        <div className='expansionPanel'>
          {componentsExpansionPanel}
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LeftContainer);

LeftContainer.propTypes = {
  components: PropTypes.array,
  addComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  updateComponent: PropTypes.func,
};
