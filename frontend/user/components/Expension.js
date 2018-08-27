import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/edit';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
			{props.registry.map(n => {
				return (
					<ExpansionPanel key={n._id}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography className={classes.heading}>
								<span style={{fontWeight:700}}>{n.name}</span><br />
								{n.value1 + ', ' + n.value2 + ', ' + n.value3 + ', ' + n.value4}
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails>
							<Typography>
								<span style={{fontWeight:700}}>
									{props.i18n.NAME + ':'}
								</span><br />{n.name}<br />
								<span style={{fontWeight:700}}>
									{props.i18n.VALUE_1 + ':'}
								</span>
								{' ' + n.value1}<br />
								<span style={{fontWeight:700}}>
									{props.i18n.VALUE_2 + ':'}
								</span>
								{' ' + n.value2}<br />
								<span style={{fontWeight:700}}>
									{props.i18n.VALUE_3 + ':'}
								</span>
								{' ' + n.value3}<br />
								<span style={{fontWeight:700}}>
									{props.i18n.VALUE_4 + ':'}
								</span>
								{' ' + n.value4}<br />
								<br />
								<Button mini variant="fab" onClick={() => props.onClickRecord(n._id)}>
									<EditIcon />
								</Button>
							</Typography>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				);
			})}
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);