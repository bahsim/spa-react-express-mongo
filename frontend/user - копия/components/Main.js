import React, { Component, PropTypes } from 'react';
import { bindActionCreators} from 'redux';
import { findDOMNode} from 'react-dom';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';
import { letMeExit, 
				 getCurrentDateTime, 
				 preLoading } from '../actions/main';
import { keyPressed } from '../actions/hotkeys';
import Drill from './Drill';
import DrillHistory from './DrillHistory';
import MainMenu from './Main/MainMenu';
import Tasks from './Tasks';

import {HotKeys} from 'react-hotkeys';
const map = {
  'escape': 'esc',
	'insert': 'ins',
	'left': 	'left',
	'up': 		'up',
	'right': 	'right',
	'down': 	'down'
};

var App = createReactClass({
	componentDidMount() {
		this.props.actions.getCurrentDateTime('getDateTimeDispatcher?sid=' + userSid);
		setInterval(() => { 
			this.props.actions.getCurrentDateTime('getDateTimeDispatcher?sid=' + userSid)
		}, 1000);
		loaderInit.outerHTML = '';
		app.hidden = false;
		this.props.actions.preLoading('dispatcherPreload?sid=' + userSid);
	},
	displayMe(value) {
		return (this.props.appMode === value ? {display:''} : {display:'none'})
	},
	letMeExit() {
		this.props.actions.letMeExit('/logout?sid=' + userSid)
	},
	//
	pressedEscape() { this.props.actions.keyPressed('escape') },
	pressedInsert() { this.props.actions.keyPressed('insert') },
	pressedLeft() 	{ this.props.actions.keyPressed('left') },
	pressedUp() 		{ this.props.actions.keyPressed('up') },
	pressedRight() 	{ this.props.actions.keyPressed('right') },
	pressedDown() 	{ this.props.actions.keyPressed('down') },
	//
	render() {
		//
		const styleLoaderLogo = {
			display:'block',
			marginLeft:'auto',
			marginRight:'auto'
		};
		const styleLoaderError = (
			this.props.hasErrored ? 
				{display:''} : {display:'none'}
		);
		const styleLoaderWait = (
			this.props.hasErrored == false && this.props.isLoading == true ? 
				{display:''} : {display:'none'}
		);
		const styleMainWindow = (
			this.props.hasErrored == true || this.props.isLoading == true ? 
				{display:'none'} : {display:''}
		);
		const styleLoaderLabel = 	{
			display:'block',
			textAlign:'center'
		};
		//
		const styleLabelName = {
			fontSize:'18px',
			color:'#828282'
		}
		const styleLabelValue = {
			fontSize:'18px',
			color:'#f0ad4e',
			fontWeight:'700'
		}
		const styleDateTime = {
			fontSize:'18px',
			color:'#828282',
			fontWeight:'700'
		}
		const styleBtnExit = {
			fontSize:'18px',
			cursor:'pointer'
		}
		//
		const handlers = {
			'escape': this.pressedEscape,
			'insert': this.pressedInsert,
			'left': 	this.pressedLeft,
			'up': 		this.pressedUp,
			'right': 	this.pressedRight,
			'down': 	this.pressedDown,
		};
		// tabIndex="-1" style={{outline: 0}}
		return (
			<HotKeys keyMap={map} handlers={handlers} focused={true} attach={window}>
				<div tabIndex="1">
				<div className="container" tabIndex="-1" style={{outline: 0}}>
					
					<div className="loader" style={styleLoaderError}>
						<img src="/logo2.png" style={styleLoaderLogo} alt="" />
						<img src="/logo3.png" style={styleLoaderLogo} alt="" />
						<h2 style={styleLoaderLabel}>ошибка доступа!</h2>
					</div>
					
					<div className="loader" style={styleLoaderWait}>
						<img src="/logo2.png" style={styleLoaderLogo} alt="" />
						<img src="/logo3.png" style={styleLoaderLogo} alt="" />
						<h2 style={styleLoaderLabel}>пожалуйста, подождите...</h2>
					</div>
					
					<div className="row" 	style={styleMainWindow}>
						<div className="col-md-2"></div>
						<div className="col-md-10">
							<div className="row">
								<div className="col-md-7">
									<span style={styleLabelValue}>{this.props.user.callcenterName}</span>
									<span style={styleLabelName}>{' ИИН '}</span>
									<span style={styleLabelValue}>{this.props.user.iin}</span>
									<span style={styleLabelName}>{' ФИО '}</span>
									<span style={styleLabelValue}>{this.props.user.name}</span>
								</div>
								<div className="col-md-3">
									<span style={styleDateTime}>{this.props.currentDateTime}</span>
								</div>
								<div className="col-md-2">
									<a><span style={styleBtnExit} onClick={() => this.letMeExit()}>
										{'ВЫХОД >>'}
									</span></a>
								</div>
							</div>
						</div>
						<div style={this.displayMe('main')}>
							<MainMenu/>
						</div>
						<div style={this.displayMe('drill')}>
							<Drill/>
						</div>
						<div style={this.displayMe('drillHistory')}>
							<DrillHistory/></div>
						<div style={this.displayMe('tasks')}>
							<Tasks/>
						</div>
					</div>
					
				</div>
				</div>
			</HotKeys>
		)
		
	}
});

const mapStateToProps = (state) => {
	return { 
		currentDateTime:state.currentDateTime,
		hasErrored: 		state.appHasErrored,
		isLoading: 			state.appIsLoading,
		user: 					state.user,
		appMode: 				state.appMode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			letMeExit: (url) 						=> dispatch(letMeExit(url)),
			getCurrentDateTime: (url) 	=> dispatch(getCurrentDateTime(url)),
			keyPressed: (value) 				=> dispatch(keyPressed(value)),
			preLoading: (url) 					=> dispatch(preLoading(url))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
