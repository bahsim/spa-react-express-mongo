import React from 'react'
import { connect } from 'react-redux'

import 	{ 
					putTasksRegistryHistoryRecordId,
					openTasksRecordView,
					openTasksRecordEdit
				} from '../../actions/tasks'
import { putUserForm } 	from '../../actions/hotkeys';

import createReactClass from 'create-react-class'

const TasksRegistryHistory = createReactClass({
	componentDidUpdate() {
		this.instance.style.height = this.props.registryHeight
	},
	clickItem(item) {
		this.props.putUserForm('tasksViewRec');
		this.props.putRecordId(item.id);
		(item.done ? 
			this.props.openTasksRecordView(item)
		: 
			this.props.openTasksRecordEdit(item)
		)
	},
	getRecordView(item) {
		let view = [0,1,2];
		view[0] = item.typeView;
		view[1] = <br key={'br_' +item.id}/>;
		view[2] = '';
		switch (item.type) {
			case 'atc':
				if (item.signalAtc) {
					view[0] += ', ' + item.signalAtc.signalView;
					view[2] += item.signalAtc.organization;
				}
				break;
			case 'call101':
				if (item.caller) {
					let i = item.caller;
					view[0] += ', ' + i.surname + ' ' + i.firstname + ' ' + i.middlename;
				}
				if (item.place) {
					let i = item.place;
					view[0] += ', ' + i.region;
					switch(i.type) {
						case 'urban':		
							view[0] += ' ' + i.town + ' ' + i.street + ' ' + i.number;
							break;
						case 'country': 
							view[0] += ' ' + i.note
							break;
					}
				}
				if (item.cause) {
					let i = item.cause;
					view[2] += ' ' + i.typeView + ' ' + i.subtypeView
					if (item.extraInfo) {
						switch (item.cause.type + '_' + item.cause.subtype) {
							case 'fire_common':
								let i = item.extraInfo;
								if (i.threatToHuman) {
									view[2] += ', угроза людям';
								}
								view[2] += ', ' + i.objectTypeView;
								if (i.totalHeight > 1) {
									view[2] += ', этажность ' + i.height + '/' + i.totalHeight;
								}
								break;
						}
					}
				}
				break;
		}
		return view;
	},
	isDeleted(item) {
		return (
			item.deleted === true ? {textDecorationLine: 'line-through', textDecorationStyle: 'solid'} : {}
		)
	},
	render: function() {
		return (
			<div ref={(el) => this.instance = el } style={{overflow:'auto',cursor:'pointer'}}>
				<table className="table table-hover" style={{fontSize:'18px'}}>
					<tbody>
						{this.props.registry.map((item, index) => (
							<tr key={"tasksHistory" + item.id} ref={"tasks" + item.id} style={this.isDeleted(item)}
									onClick={() => this.clickItem(item)}
									className={this.props.recordId === item.id ? 'info' : ''}>
								<td>{item.stationName}</td>
								<td>
									{item.date !== '' ?  (new Date(item.date)).toLocaleDateString() : ''}
									<br/>
									{item.time + '-' + 	item.timeEnd}
								</td>
								<td>
									{this.getRecordView(item)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	appMode: 				state.appMode,
	windowState: 		state.tasksWindowState,
	registryHeight:	state.tasksRegistryHeight,
	registry:				state.tasksRegistryHistoryFiltered,
	recordId: 			state.tasksRegistryHistoryRecordId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  openTasksRecordView: 	(value) 	=> dispatch(openTasksRecordView(value)),
  openTasksRecordEdit: 	(value) 	=> dispatch(openTasksRecordEdit(value)),
	putRecordId: 					(value) 	=> dispatch(putTasksRegistryHistoryRecordId(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRegistryHistory);
