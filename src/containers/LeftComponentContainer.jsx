import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import RoutesContainer from './RoutesContainer.jsx';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 10,
    // backgroundColor: '#333333',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  panel: {
    backgroundColor: '#333333',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    padding: 0,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
  },
  light: {
    color: '#eee',
    // opacity: '0.8',

    '&:hover': {
      color: '#1de9b6',
    },
  },
  label: {
    color: '#eee',
    marginRight: '10px',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  button: {
    color: '#fff',

    '&:disabled': {
      color: 'grey',
    },
  },
});

const LeftComponentContainer = (props) => {
  const {
    index,
    classes,
    focusComponent,
    component,
    updateComponent,
    deleteComponent,
    onExpansionPanelChange,
    moveToBottom,
    moveToTop,
    setVisible,
    setSelectableRoutes,
  } = props;
  const {
    title,
    id,
    stateful,
    color,
    parent,
    selectableParents,
    selectableRoutes,
    router,
    routes,
    visible,
  } = component;
  const parentOptions = [
    <option value="null" key="">
      None
    </option>,
    ...selectableParents.map(selectableParent => (
      <option value={selectableParent.id} key={selectableParent.id}>
        {selectableParent.title}
      </option>
    )),
  ];

  const handleDeleteComp = (event) => {
    if (!visible) setVisible(id);
    deleteComponent({
      index,
      id,
      parent,
      routes,
    });
    setSelectableRoutes(parent.id);
  };

  const handleUpdateColor = (event) => {
    updateComponent({ color: event.target.value, index, id });
  };

  const RouteComponent = router ? (<RoutesContainer
    component={component}
    classes={classes}
    selectableRoutes = {selectableRoutes}
    id = {id}
  />) : null;

  return (
    <div className={classes.root}>
      <ExpansionPanel
        className={classes.panel}
        expanded={focusComponent.id === id}
        onChange={() => onExpansionPanelChange(component)}
        elevation={4}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon style={{ color }} />}
        >
          <Typography className={classes.light}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor="stateful">
              Stateful?
            </InputLabel>
            <Switch
              checked={stateful}
              onChange={event => updateComponent({ stateful: event.target.checked, index, id })
              }
              value="stateful"
              color="primary"
              id="stateful"
            />
          </div>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor="router">
              Router?
            </InputLabel>
            <Switch
              checked={router}
              onChange={(event) => {
                updateComponent({ router: event.target.checked, index, id });
              }}
              value="router"
              color="primary"
              id="router"
            />
          </div>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor="boxColor">
              Box Color
            </InputLabel>
            <Input
              type="color"
              id="boxColor"
              disableUnderline={true}
              value={color}
              onChange={handleUpdateColor}
            />
          </div>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor="parentSelect">
              Parent
            </InputLabel>
            <Select
              className={classes.light}
              native
              value={parent.id}
              id="parentSelect"
              name="parentName"
              onChange={(event) => {
                const newParentId = event.target.value;
                updateComponent({
                  newParentId,
                  index,
                  id,
                  parent,
                });
              }}
            >
              {parentOptions}
            </Select>
          </div>
          <div className="classes.column">
            {RouteComponent}
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.actions}>
          <Tooltip title="move layer up">
            <IconButton
              className={classes.button}
              onClick={() => moveToTop(id)}
              aria-label="Flip to back"
            >
              <FlipToFrontIcon className={classes.light} />
            </IconButton>
          </Tooltip>
          <Tooltip title="move layer down">
            <IconButton
              className={classes.button}
              onClick={() => moveToBottom(id)}
              aria-label="Flip to back"
            >
              <FlipToBackIcon className={classes.light} />
            </IconButton>
          </Tooltip>
          <IconButton
            className={classes.button}
            onClick={handleDeleteComp}
            aria-label="Delete"
          >
            <DeleteIcon className={classes.light} />
          </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
};

export default withStyles(styles)(LeftComponentContainer);

LeftComponentContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object,
  index: PropTypes.number,
  focusComponent: PropTypes.object.isRequired,
  onExpansionPanelChange: PropTypes.func,
  updateComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  moveToBottom: PropTypes.func,
  moveToTop: PropTypes.func,
  routes: PropTypes.object,
  setVisible: PropTypes.func.isRequired,
  setSelectableRoutes: PropTypes.func.isRequired,
};
