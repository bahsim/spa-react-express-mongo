import React from 'react'
import { putTasksRecordHeight } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';
//
import TasksFuncPanelRecordNew 				from './TasksFuncPanelRecordNew';
import TasksFuncPanelRecordEdit 			from './TasksFuncPanelRecordEdit';
import TasksFuncPanelRecordView 			from './TasksFuncPanelRecordView';
//
import TasksRecordEditStation 				from './TasksRecordEditStation';
import TasksRecordEditStationInput 		from './TasksRecordEditStationInput';
import TasksRecordEditDate 						from './TasksRecordEditDate';
import TasksRecordEditDateInput 			from './TasksRecordEditDateInput';
import TasksRecordEditCaller 					from './TasksRecordEditCaller';
import TasksRecordEditCallerInput 		from './TasksRecordEditCallerInput';
import TasksRecordEditSignalATC 			from './TasksRecordEditSignalATC';
import TasksRecordEditSignalATCInput	from './TasksRecordEditSignalATCInput';
import TasksRecordEditPlace 					from './TasksRecordEditPlace';
import TasksRecordEditPlaceInput 			from './TasksRecordEditPlaceInput';
import TasksRecordEditCause 					from './TasksRecordEditCause';
import TasksRecordEditCauseInput 			from './TasksRecordEditCauseInput';
//
import TasksRecordEditCarsCombat 			from './TasksRecordEditCarsCombat';
//
import TasksRecordEditStats 					from './TasksRecordEditStats';
//
import TasksRecordEditHistory 				from './TasksRecordEditHistory';

var TasksRecordEdit = createReactClass({
	componentDidUpdate() {
		this.instance.style.height = 
			( (window.innerHeight - this.instance.getBoundingClientRect().top) - 25 ) + 'px';
		this.instance2.style.height = 
			( (window.innerHeight - this.instance2.getBoundingClientRect().top) - 25 ) + 'px';
		this.props.putTasksRecordHeight(
			window.innerHeight - this.instance.getBoundingClientRect().top
		);
	},
	isMyWindowState(value,value2) {
		const state = this.props.tasksFormEditState;
		if (value2 === undefined) {
			return (state === value ? {display:''} : {display:'none'})
		} else {
			return (state === value || state === value2 ? {display:''} : {display:'none'})
		}
	},
	isMySignalType(value) {
		return (this.props.tasksFormEditType === value ? {display:''} : {display:'none'})
	},
	refreshTab() {
		setTimeout(() => {
			this.props.putTasksRecordHeight(this.props.tasksRecordHeight + 1);
			this.props.putTasksRecordHeight(this.props.tasksRecordHeight - 1);
		},500)
	},
	render: function() {
		const styleTabs = {
			fontSize:'16px',
			fontWeight:700
		}
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700
		}
		const styleMainLabel = {
			display:'block',
			textAlign:'right',
			fontSize:'18px',
			fontWeight:700,
			color:'#f0ad4e'
		}
		return (
			<div>
				<div style={this.isMyWindowState('new')}>
					<TasksFuncPanelRecordNew/>
				</div>
				<div style={this.isMyWindowState('edit')}>
					<TasksFuncPanelRecordEdit/>
				</div>
				<div style={this.isMyWindowState('view')}>
					<TasksFuncPanelRecordView/>
				</div>
				<div style={this.isMyWindowState('edit', 'view')} 
						onClick={() => this.refreshTab()}>
					<br/>
					<ul className="nav nav-tabs nav-justified" style={styleTabs}>
						<li className="active">
							<a data-toggle="tab" href="#panelSignal" id="panelSignalId">
								{'СИГНАЛ'}
							</a>
						</li>
						<li>
							<a data-toggle="tab" href="#panelForces">
								{'СИЛЫ И СРЕДСТВА'}
							</a>
						</li>
						<li>
							<a data-toggle="tab" href="#panelStats">
								{'СТАТИСТИКА'}
							</a>
						</li>
						<li>
							<a data-toggle="tab" href="#panelHistory">
								{'ХРОНОЛОГИЯ'}
							</a>
						</li>
					</ul>
				</div>
				<br/>
				<div className="tab-content">
					<div id="panelSignal" className="tab-pane fade in active">
						<div style={this.isMySignalType('editCall101')}>
							<div style={this.isMyWindowState('new')}>
								<span style={styleMainLabel}>
									{'НОВЫЙ ЗВОНОК НА 101'}
								</span>
							</div>
							<div className="row" ref={(el) => this.instance = el } style={{overflow:'auto'}}>
								<div className="col-md-4">
									<div style={this.isMyWindowState('new')}>
										<TasksRecordEditDateInput/>
										<TasksRecordEditCallerInput/>
									</div>
									<div style={this.isMyWindowState('edit','view')}>
										<TasksRecordEditDate/>
										<TasksRecordEditCaller/>
									</div>
								</div>
								<div className="col-md-4">
									<div style={this.isMyWindowState('new')}>
										<TasksRecordEditPlaceInput/>
										<TasksRecordEditStationInput/>
									</div>
									<div style={this.isMyWindowState('edit','view')}>
										<TasksRecordEditPlace/>
										<TasksRecordEditStation/>
									</div>
								</div>
								<div className="col-md-4">
									<div style={this.isMyWindowState('new')}>
										<TasksRecordEditCauseInput/>
									</div>
									<div style={this.isMyWindowState('edit','view')}>
										<TasksRecordEditCause/>
									</div>
								</div>
							</div>
						</div>
						<div style={this.isMySignalType('editAtc')}>
							<div style={this.isMyWindowState('new')}>
								<span style={styleMainLabel}>
									{'НОВЫЙ СИГНАЛ АТЦ'}
								</span>
							</div>
							<div className="row" ref={(el) => this.instance2 = el } style={{overflow:'auto'}}>
								<div className="col-md-3"></div>
								<div className="col-md-6">
									<div style={this.isMyWindowState('new')}>
										<TasksRecordEditDateInput/>
										<TasksRecordEditSignalATCInput/>
										<TasksRecordEditStationInput/>
									</div>
									<div style={this.isMyWindowState('edit','view')}>
										<TasksRecordEditDate/>
										<TasksRecordEditSignalATC/>
										<TasksRecordEditStation/>
									</div>
								</div>
								<div className="col-md-3"></div>
							</div>
						</div>
					</div>
					<div id="panelForces" className="tab-pane fade">
						<div className="row">
							<TasksRecordEditCarsCombat/>
						</div>
					</div>
					<div id="panelStats" className="tab-pane fade">
						<TasksRecordEditStats/>
					</div>
					<div id="panelHistory" className="tab-pane fade">
						<TasksRecordEditHistory/>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	tasksFormEditState: state.tasksFormEditState,
	tasksFormEditType: 	state.tasksFormEditType,
	appMode: 						state.appMode,
	tasksRecordHeight: 	state.tasksRecordHeight
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksRecordHeight: (value) => dispatch(putTasksRecordHeight(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEdit);
