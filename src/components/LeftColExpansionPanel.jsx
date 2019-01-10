import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';

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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
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
  icon: {
    fontSize: '20px',
    color: '#000',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
});

const LeftColExpansionPanel = (props) => {
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
  } = props;
  const {
    title,
    id,
    stateful,
    color,
    parents,
    parentIds,
    selectableParents,
  } = component;

  const handleParentChange = (event, parentId = null) => {
    let newParentId = parentId;
    if (event) {
      const selectedParents = event.target.value;
      newParentId = selectedParents[selectedParents.length - 1].id;
    }

    return updateComponent({
      index,
      id,
      newParentId,
    });
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        className={classes.panel}
        expanded={focusComponent.id === id}
        onChange={() => onExpansionPanelChange(component)}
        elevation={4}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color }} />}>
          <Typography className={classes.light}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor='stateful'>Stateful?</InputLabel>
            <Switch
              checked={stateful}
              onChange={event => updateComponent({ stateful: event.target.checked, index, id })}
              value='stateful'
              color='primary'
              id='stateful'
            />
          </div>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor='boxColor'>Box Color</InputLabel>
            <Input
              type='color'
              id='boxColor'
              disableUnderline={true}
              value={color}
              onChange={event => updateComponent({ color: event.target.value, index, id })}
            />
          </div>
          <div className={classes.column}>
            <InputLabel className={classes.label} htmlFor='parentSelect'>selectedParents</InputLabel>
            <Select
              className={classes.light}
              multiple
              value={parents}
              id='parentSelect'
              name='parentName'
              disabled={selectableParents.length < 1}
              onChange={handleParentChange}
              input={<Input id='parentSelect' />}
              renderValue={selectedP => (
                <div className={classes.chips}>
                  {selectedP.map(parent => (
                    <Chip
                      key={parent.id}
                      label={parent.title}
                      className={classes.chip}
                      onDelete={() => handleParentChange(null, parent.id)}
                      deleteIcon={<RemoveCircleOutlineIcon className={classes.icon} />}
                      />
                  ))}
                </div>
              )}
            >
            {selectableParents.map(parentObj => (
              <MenuItem key={parentObj.id} value={parentObj}>
                <ListItemText primary={parentObj.title} />
              </MenuItem>
            ))}
            </Select>
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions className={classes.actions}>
          <Tooltip title="move layer up">
            <IconButton
              className={classes.button}
              onClick={() => moveToTop(id)}
              aria-label='Flip to back'>
              <FlipToFrontIcon className={classes.light} />
            </IconButton>
          </Tooltip>
          <Tooltip title="move layer down">
            <IconButton
              className={classes.button}
              onClick={() => moveToBottom(id)}
              aria-label='Flip to back'>
              <FlipToBackIcon className={classes.light} />
            </IconButton>
          </Tooltip>
          <IconButton
            className={classes.button}
            onClick={() => {
              deleteComponent({
                index, id, parentIds,
              });
            }}
            aria-label='Delete'>
            <DeleteIcon className={classes.light} />
          </IconButton>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div >
  );
};

export default withStyles(styles)(LeftColExpansionPanel);

LeftColExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  component: PropTypes.object,
  index: PropTypes.number,
  focusComponent: PropTypes.object.isRequired,
  onExpansionPanelChange: PropTypes.func,
  updateComponent: PropTypes.func,
  deleteComponent: PropTypes.func,
  moveToBottom: PropTypes.func,
  moveToTop: PropTypes.func,
};
