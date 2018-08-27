import React from 'react';
import createReactClass from 'create-react-class';

import NavBar from './NavBar'
import Registry from './Registry'
import Record from './Record'

import { 
	getRegistry,
	getRecord,
	createRecord,
	refreshRecord,
	deleteRecord,
} from '../api/registry'

import { initializeState } from '../state/registry'

export default createReactClass({
	getInitialState() {
		return initializeState()
	},
	componentDidMount() {
		getRegistry((value) => {
			setTimeout(() => {
				this.setState({
					isLoading:false, 
					registry: value
				})
			},1000)
		}, (error) => {
			this.setState({ 
				hasErrored: true, 
				errorMessage: error.message 
			})
		})
		loaderInit.outerHTML = '';
		app.hidden = false;
	},
	onClickAdd() {
		this.setState({ 
			record: {...this.state.recordInit},
			appMode: 'newRec',
		});
	},
	onClickRecord(id) {
		this.setState({ isLoading: true})
		getRecord(id, (value) => {
			setTimeout(() => {
				this.setState({
					record: 		value,
					appMode: 		'editRec', 
					isLoading:	false, 
				})
			},1000)
		}, (error) => {
			this.setState({ 
				hasErrored: true, 
				errorMessage: error.message 
			})
		})
	},
	saveNewRecord() {
		this.setState({ isLoading: true})
		createRecord(this.state.record, (value) => {
			this.setState({
				registry: 	value,
				appMode: 		'registry', 
				isLoading: 	false, 
			})
		}, (error) => {
			this.setState({ 
				hasErrored: 	true, 
				errorMessage: error.message 
			})
		})
	},
	saveEditRecord() {
		this.setState({ isLoading: true})
		refreshRecord(this.state.record, (value) => {
			this.setState({
				registry: 	value,
				appMode: 		'registry', 
				isLoading:	false, 
			})
		}, (error) => {
			this.setState({ 
				hasErrored: 	true, 
				errorMessage: error.message 
			})
		})
	},
	deleteRecord() {
		this.setState({ isLoading: true})
		deleteRecord(this.state.record._id, (value) => {
			this.setState({
				registry: 	value,
				appMode: 		'registry', 
				isLoading:	false, 
			})
		}, (error) => {
			this.setState({ 
				hasErrored: 	true, 
				errorMessage: error.message 
			})
		})
	},
	closeRecord() {
		this.setState({ appMode: 'registry'})
	},
	setRecord(data) {
		this.setState({record: { ...this.state.record, ...data }});
	},
	displayMe(value) {
		return (
			this.state.appMode === value ? {display:''} : {display:'none'}
		)
	},
	render() {
		const styleLoaderError = (
			this.state.hasErrored ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleLoaderWait = (
			this.state.hasErrored == false && this.state.isLoading == true ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		const styleWorkMode = (
			this.state.hasErrored == false && this.state.isLoading == false ? (
				{display:''}
			) : (
				{display:'none'}
			)
		);
		return (
			<div className="container" tabIndex="-1" style={{outline: 0}}>
				
				<div className="loader" style={styleLoaderError}>
					<img src="/logo.png" width="200vw" height="200vw" alt="" />
					<h2>{this.state.errorMessage}</h2>
				</div>
				
				<div className="loader" style={styleLoaderWait}>
					<img src="/logo.png" width="200vw" height="200vw" alt="" />
					<h2>работа кипит...</h2>
				</div>
				
				<div style={styleWorkMode}>
					
					<NavBar 
						displayMe={this.displayMe} 
						onClickAdd={this.onClickAdd} 
					/>
					
					<br />
					
					<div style={this.displayMe('registry')}>
						<Registry registry={this.state.registry} onClickRecord={this.onClickRecord} />
					</div>
					
					<div style={this.displayMe('newRec')}>
						<Record 
							record={this.state.record}
							change={this.setRecord}
							save={this.saveNewRecord} 
							close={this.closeRecord} 
						/>
					</div>
					
					<div style={this.displayMe('editRec')}>
						<Record 
							record={this.state.record}
							change={this.setRecord}
							save={this.saveEditRecord} 
							close={this.closeRecord} 
							delete={this.deleteRecord} 
						/>
					</div>
					
				</div>
				
			</div>
		)
		
	}
});
