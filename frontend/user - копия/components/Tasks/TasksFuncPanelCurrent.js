import React from 'react'
import { connect } from 'react-redux'

import { openTasksRecordNew,
				 getTasksRegistryCurrent } from '../../actions/tasks';
import { putUserForm } 	from '../../actions/hotkeys';

import createReactClass from 'create-react-class'

const TasksFuncPanelCurrent = createReactClass({
	refresh() {
		this.props.getTasksRegistryCurrent('getTasksRegistryCurrent?sid=' + userSid)
	},
	openRegistration(editType) {
		//
		this.props.putUserForm('tasksNewRec');
		this.props.openTasksRecordNew(editType)
		//
	},
	displayMe() {
		return (
			this.props.tasksCallcenterId !== 'TASKS_CALLCENTER_ALL'
			&& this.props.tasksStationId !== 'TASKS_STATION_ALL' 
			&& this.props.tasksStationId !== '' ? 
				{display: ''} 
			: 
				{display: ''}
		)
	},
	render: function() {
		const styleBtnCall101 	= {cursor:'pointer',fontWeight:700,fontSize:'18px'};
		const styleBtnAtcSignal = {cursor:'pointer',fontWeight:700,fontSize:'16px'};
		const styleBtnRefresh 	= {cursor:'pointer',fontWeight:700,fontSize:'16px',color:'#828282'};
		return (
			<div className="form-control">
				<div className="row">
					<div className="col-md-2">
					</div>
					<div className="col-md-3">
						<div style={{...{marginTop:'-3px'},...this.displayMe()}}>
							<a title="INSERT" style={styleBtnCall101} 
									onClick={() => this.openRegistration('editCall101')}>
								{'>> ЗВОНОК НА 101 <<'}
							</a>
						</div>
					</div>
					<div className="col-md-2">
						<div style={this.displayMe()}>
							<a style={styleBtnAtcSignal} onClick={() => this.openRegistration('editAtc')}>
								{'СИГНАЛ АТЦ'}
							</a>
						</div>
					</div>
					<div className="col-md-3">
					</div>
					<div className="col-md-2">
						<a style={styleBtnRefresh} onClick={() => this.refresh()}>
							{'ОБНОВИТЬ'}
						</a>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	tasksStationId: state.tasksStationId,
	tasksCallcenterId: state.tasksCallcenterId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 							=> dispatch(putUserForm(item)),
  openTasksRecordNew: 	(value) 		=> dispatch(openTasksRecordNew(value)),
	getTasksRegistryCurrent: (value) 	=> dispatch(getTasksRegistryCurrent(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksFuncPanelCurrent);
