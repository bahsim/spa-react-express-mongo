import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

import { genTasksCombatCarsRegistry } from '../actions/tasksEditCars';
import { putUserForm } 								from '../actions/hotkeys';
import { putAppMode } 								from '../actions/main';
import { putTasksRegistryTab } 				from '../actions/tasks';

import TasksCallcenters 			from './Tasks/TasksCallcenters';
import TasksStations 					from './Tasks/TasksStations';
import TasksInformPanel 			from './Tasks/TasksInformPanel';
import TasksFuncPanelCurrent 	from './Tasks/TasksFuncPanelCurrent';
import TasksFuncPanelHistory 	from './Tasks/TasksFuncPanelHistory';
import TasksFuncPanelCars 		from './Tasks/TasksFuncPanelCars';
import TasksRegistryOwn 			from './Tasks/TasksRegistryOwn';
import TasksRegistryCurrent 	from './Tasks/TasksRegistryCurrent';
import TasksRegistryHistory 	from './Tasks/TasksRegistryHistory';
import TasksRegistryCars 			from './Tasks/TasksRegistryCars';
import TasksRecordEdit 				from './Tasks/TasksRecordEdit';

var Tasks = createReactClass({
	getInitialState () {
    return {
      tab: 'current'
    };
  },
	componentDidUpdate() {
		if (this.state.tab !== this.props.tasksRegistryTab) {
			switch (this.props.tasksRegistryTab) {
				case 'own':
					$('#tabOwnId').click();
					this.displayFilter(true);
					this.selectTab('own');
					break;
				case 'current1':
					$('#tabCurrentId').click();
					this.displayFilter(false);
					this.selectTab('current1')
					break;
				case 'history':
					$('#tabHistoryId').click();
					this.displayFilter(false);
					this.selectTab('history')
					break;
				case 'cars':
					$('#tabCarsId').click();
					this.displayFilter(true);
					this.showRegistry();
					this.selectTab('cars');
					break;
			}
			this.setState({tab:this.props.tasksRegistryTab});
		}
	},
	isStationsVisible() {
		return (this.props.tasksStationsListFlag === true ? 
			{display:''} : {display:'none'}
		)
	},
	
	gotoBack() {
		this.props.putUserForm('main');
		this.props.gotoBack('main');
	},
	
	isMyWindowState(value) {
		return (
			this.props.windowState === value ? {display:''} : {display:'none'}
		)
	},
	
	displayOwn() {
		let stations = this.props.ownStations
		if (stations.length === 1) {
			this.refs.tabOwn.innerHTML = stations[0].name;
			this.refs.tabCurrent.innerHTML = 'ПО ФИЛЬТРУ';
			return {display:''}
		} else {
			return {display:'none'}
		}
	},
	
	displayFilter(bool) {
		this.refs.filter.hidden = bool;
	},
	
	showRegistry() {
		this.props.genTasksCombatCarsRegistry();
	},
	
	selectTab(value) {
		console.log('selectTab - ' + value);
		this.props.putTasksRegistryTab(value);
	},
	
	render: function() {
		
		const styleLabel = {
			fontSize:'16px',
			fontWeight:700,
			display:'block',
			textAlign:'center',
			color:'#f0ad4e',
			paddingBottom: '10px'
		}
		
		const styleTD1 = {width:'25%'}
		const styleTD2 = {width:'50%'}
		const styleTD3 = {width:'25%'}
		
		const styleLogo = {
			display:'block',
			marginLeft:'auto',
			marginRight:'auto'
		};
		
		const styleBtnBack = {
			display:'block',
			textAlign:'center',
			fontSize:'18px',
			fontWeight:700,
			cursor:'pointer'
		};
		
		const styleMainLabel = {
			display:'block',
			textAlign:'center',
			fontSize:'18px',
			fontWeight:'700',
			color:'#f0ad4e'
		};

		return (
			<div>
				<div className="col-md-2">
					<img src="/logo2.png" style={styleLogo} width="47" height="41" alt="" />
					<img src="/logo3.png" style={styleLogo} width="171" height="33" alt="" />
					<br/>
					<div style={this.isMyWindowState('registry')}>
						<a title="ESC"><span style={styleBtnBack} onClick={() => this.gotoBack()}>
							{'<< НАЗАД'}
						</span></a>
						<br/>
						<div ref="filter">
							<span style={styleLabel}>
								{'CALL-ЦЕНТР'}
							</span>
							<TasksCallcenters/>
							<br/>
							<div style={this.isStationsVisible()}>
								<span style={styleLabel}>
									{'ПОЖАРНАЯ ЧАСТЬ'}
								</span>
								<TasksStations/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-10">
					<div ref="workSpace">
						<div style={this.isMyWindowState('registry')}>
							<TasksInformPanel/>
							<br/>
							<div className="row" style={{fontSize:'16px'}}>
								<div className="col-md-9">
									<ul className="nav nav-tabs nav-justified">
										<li style={this.displayOwn()} 
												onClick={() => {this.displayFilter(true);this.selectTab('own');}}>
											<a id="tabOwnId" data-toggle="tab" href="#panelOwn">
												<span ref="tabOwn" style={{fontWeight:700}}>
													{'СВОИ'}
												</span>
											</a>
										</li>
										<li className="active">
											<a id="tabCurrentId" data-toggle="tab" href="#panelCurrent" 
													onClick={() => {this.displayFilter(false);this.selectTab('current1')}}>
												<span ref="tabCurrent" style={{fontWeight:700}}>
													{'ТЕКУЩЕЕ'}
												</span>
											</a>
										</li>
										<li>
											<a id="tabHistoryId" data-toggle="tab" href="#panelArchive" 
													onClick={() => {this.displayFilter(false);this.selectTab('history')}}>
												<b>{'АРХИВ'}</b>
											</a>
										</li>
										<li>
											<a id="tabCarsId" data-toggle="tab" href="#panelCars" 
													onClick={() => {
														this.displayFilter(true);
														this.showRegistry();
														this.selectTab('cars');
													}}>
												<b>{'АВТОТЕХНИКА'}</b>
											</a>
										</li>
									</ul>
								</div>
								<div className="col-md-3">
									<div style={{marginTop:'-13px'}}>
										<br/>
										<span style={styleMainLabel}>
											{'БОЕВЫЕ ВЫЕЗДЫ'}
										</span>
									</div>
								</div>
							</div>
							<br/>
							<div className="tab-content">
								<div id="panelCurrent" className="tab-pane fade in active">
									<TasksFuncPanelCurrent/>
									<br/>
									<TasksRegistryCurrent/>
								</div>
								<div id="panelArchive" className="tab-pane fade">
									<TasksFuncPanelHistory/>
									<br/>
									<TasksRegistryHistory/>
								</div>
								<div id="panelOwn" className="tab-pane fade">
									<TasksFuncPanelCurrent/>
									<br/>
									<TasksRegistryOwn/>
								</div>
								<div id="panelCars" className="tab-pane fade">
									<TasksFuncPanelCars/>
									<br/>
									<TasksRegistryCars/>
								</div>
							</div>
						</div>
						<div style={this.isMyWindowState('recordEdit')}>
							<TasksRecordEdit/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	tasksStationsListFlag: 	state.tasksStationsListFlag,
	windowState: 						state.tasksWindowState,
	ownStations:						state.drillStations,
	tasksRegistryTab:				state.tasksRegistryTab
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 								=> dispatch(putUserForm(item)),
  gotoBack: (item) 										=> dispatch(putAppMode(item)),
	genTasksCombatCarsRegistry: (value) => dispatch(genTasksCombatCarsRegistry(value)),
	putTasksRegistryTab: (value) 				=> dispatch(putTasksRegistryTab(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
