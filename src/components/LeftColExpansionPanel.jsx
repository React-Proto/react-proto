import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

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
  const { classes, title } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Is this going to be a stateful component?
          </Typography>
          <Switch
          // checked={this.state.checkedB}
          // onChange={this.handleChange('checkedB')}
          value="checkedB"
          color="primary"
        />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

LeftColExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LeftColExpansionPanel);


// <FormControl component="fieldset" required className={classes.formControl}>
// <FormLabel component="legend">Stateful?</FormLabel>
// <RadioGroup
//   aria-label="Stateful"
//   name="stateful"
//   className={classes.group}
//   // value={this.state.value}
//   // onChange={this.handleChange}
// >
//   <FormControlLabel value="stateful" control={<Radio />} label="Stateful" />
// </RadioGroup>
// </FormControl>

LeftColExpansionPanel.propTypes = {
  title: PropTypes.string,
};
