import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

const LeftColExpansionPanel = (props) => {
  const { classes, title, index, id, handleColorChange, color, handleDeleteComponent } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            STATEFUL?
          </Typography>
          <Switch
          // checked={this.state.checkedB}
          // onChange={this.handleChange('checkedB')}
          value="checkedB"
          color="primary"
        />
        <Input
          type="color"
          disableUnderline={true}
          value={color}
          onChange={(event) => {
            handleColorChange({ color: event.target.value, index, id });
          }}
        />
        <IconButton
          className={classes.button}
          onClick={() => {
            handleDeleteComponent({ index, id });
          }}
          aria-label="Delete">
          <DeleteIcon />
        </IconButton>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

LeftColExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftColExpansionPanel);

LeftColExpansionPanel.propTypes = {
  title: PropTypes.string,
};
