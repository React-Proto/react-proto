import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LeftComponentContainer from './LeftComponentContainer.jsx';
import createModal from '../utils/createModal.util';
import * as actions from '../actions/components';

const mapDispatchToProps = dispatch => ({
  addComponent: ({ title }) => dispatch(actions.addComponent({ title })),
  updateComponent:
    ({
      id, index, parent = null, newParentId = null, color = null, stateful = null, router = null,
    }) => dispatch(actions.updateComponent({
      id, index, parent, newParentId, color, stateful, router,
    })),
  deleteComponent: ({
    index, id, parent, routes,
  }) => dispatch(actions.deleteComponent({
    index, id, parent, routes,
  })),
  moveToBottom: componentId => dispatch(actions.moveToBottom(componentId)),
  moveToTop: componentId => dispatch(actions.moveToTop(componentId)),
  openExpansionPanel: component => dispatch(actions.openExpansionPanel(component)),
  deleteAllData: () => dispatch(actions.deleteAllData()),
  setVisible: compId => dispatch(actions.setVisible(compId)),
  setSelectableRoutes: componentId => dispatch(actions.setSelectableRoutes(componentId)),
});

const styles = theme => ({
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green',
    },
  },
  cssFocused: {},
  input: {
    color: '#fff',
    opacity: '0.7',
    marginBottom: '10px',
  },
  underline: {
    color: 'white',
    '&::before': {
      color: 'white',
    },
  },
  button: {
    color: '#fff',

    '&:disabled': {
      color: 'grey',
    },
  },
  clearButton: {
    top: '96%',
    position: 'sticky!important',
    zIndex: '1',

    '&:disabled': {
      color: 'grey',
      backgroundColor: '#424242',
    },
  },
});


class LeftContainer extends Component {
  state = {
    componentName: '',
    modal: null,
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleExpansionPanelChange = (component) => {
    const { focusComponent } = this.props;
    this.props.openExpansionPanel(focusComponent.id === component.id ? {} : component);
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
      moveToTop,
      focusComponent,
      totalComponents,
      classes,
      setVisible,
      setSelectableRoutes,
    } = this.props;
    const { componentName, modal } = this.state;

    const componentsExpansionPanel = components.map(
      (component, i) => <LeftComponentContainer
        key={component.id}
        index={i}
        id={component.id}
        updateComponent={updateComponent}
        deleteComponent={deleteComponent}
        component={component}
        focusComponent={focusComponent}
        onExpansionPanelChange={this.handleExpansionPanelChange}
        moveToBottom={moveToBottom}
        moveToTop={moveToTop}
        setVisible={setVisible}
        setSelectableRoutes={setSelectableRoutes}
      />,
    );
    return (
      <div className='column left'>
        <FormControl
          fullWidth={true}

          // what is this??
          formlabellasses={{
            root: classes.cssLabel,
          }}
        >
          <Grid container alignItems='baseline' align='stretch'>
            <Grid item xs={10}>
              <TextField
                id='title-input'
                label='Add a new component'
                placeholder='AppComponent'
                margin='normal'
                autoFocus
                onChange={this.handleChange}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    // Do code here
                    this.handleAddComponent();
                    ev.preventDefault();
                  }
                }}
                value={componentName}
                name='componentName'
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
                variant='fab'
                mini
                color='primary'
                className={classes.button}
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
          className={classes.clearButton}
        >
          Clear workspace
        </Button>
        {modal}
      </div >
    );
  }
}

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(LeftContainer);

LeftContainer.propTypes = {
  components: PropTypes.array.isRequired,
  addComponent: PropTypes.func.isRequired,
  deleteComponent: PropTypes.func.isRequired,
  updateComponent: PropTypes.func.isRequired,
  deleteAllData: PropTypes.func.isRequired,
  moveToBottom: PropTypes.func.isRequired,
  moveToTop: PropTypes.func.isRequired,
  focusComponent: PropTypes.object.isRequired,
  openExpansionPanel: PropTypes.func.isRequired,
  totalComponents: PropTypes.number.isRequired,
  classes: PropTypes.object,
  setVisible: PropTypes.func.isRequired,
  setSelectableRoutes: PropTypes.func.isRequired,
};
