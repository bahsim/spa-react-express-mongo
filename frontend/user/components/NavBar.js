import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0093e7',
    },
    secondary: {
      main: '#e39b3d',
    },
  },
});

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="display1" className={classes.flex}>
							<span style={{color:'white',display:'inline-flex',verticalAlign:'middle'}}>
								<img src="/logo.png" alt="" width="130" height="60" />
							</span>
						</Typography>
						<div style={props.displayMe('registry')}>
							<Button mini variant="fab" aria-label="Add" color="secondary"
								onClick={() => props.onClickAdd()}
							>
								<AddIcon/>
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);