import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

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
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  root: {
    flexGrow: 1
  },
	margin: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    marginLeft: -12,
    marginRight: 20,
		color: 'white'
  },
};

function ButtonAppBar(props) {
	const { classes } = props;
	const styleLabel = (
		isBrowser ? (
			{fontSize:'14px',fontWeight:700}
		) : (
			{fontSize:'14px',fontWeight:700, display:'none'}
		)
	)
  return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item md={3}></Grid>
					<Grid item md={6}>
						<Paper className={classes.root} elevation={1}>
							<div style={{paddingLeft:'10px',paddingRight:'25px'}}>
								<br/>
								<FormControl fullWidth>
									<TextField 
										label="НАИМЕНОВАНИЕ"
										value={props.record.name}
										onChange={(e) => props.change({name:e.target.value})}
									/>
								</FormControl>
							</div>
							<FormControl className={classes.container} noValidate autoComplete="off">
								<TextField
									value={props.record.value1}
									onChange={(e) => props.change({value1:e.target.value})}
									label="ЗНАЧЕНИЕ 1"
									type="number"
									className={classes.textField}
									margin="normal"
								/>
							</FormControl>
							<FormControl className={classes.container} noValidate autoComplete="off">
								<TextField
									value={props.record.value2}
									onChange={(e) => props.change({value2:e.target.value})}
									label="ЗНАЧЕНИЕ 2"
									type="number"
									className={classes.textField}
									margin="normal"
								/>
							</FormControl>
							<FormControl className={classes.container} noValidate autoComplete="off">
								<TextField
									value={props.record.value3}
									onChange={(e) => props.change({value3:e.target.value})}
									label="ЗНАЧЕНИЕ 3"
									type="number"
									className={classes.textField}
									margin="normal"
								/>
							</FormControl>
							<FormControl className={classes.container} noValidate autoComplete="off">
								<TextField
									value={props.record.value4}
									onChange={(e) => props.change({value4:e.target.value})}
									label="ЗНАЧЕНИЕ 4"
									type="number"
									className={classes.textField}
									margin="normal"
								/>
							</FormControl>
							<br />
							<BrowserView>
								<div align="center">
									<Button mini variant="contained" color="secondary"
										onClick={() => props.save()}
									>
										<SaveIcon />
										<span style={styleLabel}>СОХРАНИТЬ</span>
									</Button>
									&nbsp;&nbsp;&nbsp;
									<Button mini variant="contained" color="secondary"
										onClick={() => props.close()}
									>
										<CloseIcon />
										<span style={styleLabel}>ЗАКРЫТЬ</span>
									</Button>
									{props.delete !== undefined ? 
										<span>
											&nbsp;&nbsp;&nbsp;
											<Button mini variant="contained" 
												onClick={() => props.delete()}
											>
												<DeleteIcon />
												<span style={styleLabel}>УДАЛИТЬ</span>
											</Button>
										</span>
									:
										''
									}
								</div>
							</BrowserView>
							<MobileView>
								<div align="center">
									<Button mini variant="fab" color="secondary"
										onClick={() => props.save()}
									>
										<SaveIcon />
										<span style={styleLabel}>СОХРАНИТЬ</span>
									</Button>
									&nbsp;&nbsp;&nbsp;
									<Button mini variant="fab" color="secondary"
										onClick={() => props.close()}
									>
										<CloseIcon />
										<span style={styleLabel}>ЗАКРЫТЬ</span>
									</Button>
									{props.delete !== undefined ? 
										<span>
											&nbsp;&nbsp;&nbsp;
											<Button mini variant="fab" 
												onClick={() => props.delete()}
											>
												<DeleteIcon />
												<span style={styleLabel}>УДАЛИТЬ</span>
											</Button>
										</span>
									:
										''
									}
								</div>
							</MobileView>
							<br />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</MuiThemeProvider>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);