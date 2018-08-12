import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel.jsx';
import createModal from '../utils/createModal.util';
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
  moveToBottom: componentId => dispatch(actions.moveToBottom(componentId)),
  openExpansionPanel: componentId => dispatch(actions.openExpansionPanel(componentId)),
  deleteAllData: () => dispatch(actions.deleteAllData()),
});

class LeftContainer extends Component {
  state = {
    componentName: '',
    modal: null,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.trim(),
    });
  }

  handleExpansionPanelChange = (id, panelId) => {
    this.props.openExpansionPanel(panelId === id ? '' : id);
  }

  handleAddComponent = () => {
    this.props.addComponent({ title: this.state.componentName });
    this.setState({
      componentName: '',
    });
  }

  closeModal = () => this.setState({ modal: null });

  clearWorkspace = () => {
    this.setState({
      modal: createModal({
        message: 'Are you sure want to delete all data?',
        closeModal: this.closeModal,
        secBtnLabel: 'Clear Workspace',
        secBtnAction: () => { this.props.deleteAllData(); this.closeModal(); },
      }),
    });
  }

  render() {
    const {
      components,
      updateComponent,
      deleteComponent,
      moveToBottom,
      openExpansionPanel,
      expandedPanelId,
      totalComponents,
    } = this.props;
    const { componentName, modal } = this.state;

    const componentsExpansionPanel = components.map(
      (component, i) => <LeftColExpansionPanel
        key={component.id}
        index={i}
        id={component.id}
        updateComponent={updateComponent}
        deleteComponent={deleteComponent}
        component={component}
        panelId={expandedPanelId}
        onExpansionPanelChange={this.handleExpansionPanelChange}
        moveToBottom={moveToBottom}
        openExpansionPanel={openExpansionPanel}
      />,
    );

    return (
      <div className='column left'>
        <FormControl fullWidth={true} className='component-input'>
          <Grid container alignItems='baseline' align='stretch'>
            <Grid item xs={10}>
              <TextField
                id='title-input'
                label='New component'
                placeholder='AppComponent'
                margin='normal'
                autoFocus
                onChange={this.handleChange}
                value={componentName}
                name='componentName'
                style={{ width: '95%', color: '#fff' }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant='fab'
                mini
                color='primary'
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
        <Button
          color='secondary'
          aria-label='Delete All'
          variant='contained'
          onClick={this.clearWorkspace}
          disabled={totalComponents < 1}
          className='clear-workspace'
        >
          Clear workspace
        </Button>
        {modal}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(LeftContainer);

LeftContainer.propTypes = {
  components: PropTypes.array.isRequired,
  addComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  deleteAllData: PropTypes.func.isRequired,
  moveToBottom: PropTypes.func.isRequired,
  expandedPanelId: PropTypes.string.isRequired,
  openExpansionPanel: PropTypes.func.isRequired,
  totalComponents: PropTypes.number.isRequired,
};
