import React from 'react'
import { connect } from 'react-redux'

import 	{ 
					putTasksRegistryHeight,
					putTasksRegistryCurrentRecordId,
					openTasksRecordEdit 
				} from '../../actions/tasks';
import { putUserForm } 	from '../../actions/hotkeys';

import createReactClass from 'create-react-class'

const TasksRegistryOwn = createReactClass({
	componentDidUpdate() {
		this.instance.style.height = this.props.registryHeight
	},
	clickItem(item) {
		this.props.putUserForm('tasksViewRec');
		this.props.putRecordId(item.id)
		this.props.openTasksRecordEdit(item)
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
	getRegistryOnlyOwn() {
		let ownStations = this.props.ownStations;
		let registryAll = this.props.registry;
		let registryOwn = []
		for (let i = 0; i < registryAll.length; i++) {
			for (let j = 0; j < ownStations.length; j++) {
				if (ownStations[j].id === registryAll[i].stationId) {
					registryOwn.push(registryAll[i]);
					break;
				}
			}
		}
		return (
			registryOwn.map((item, index) => (
				<tr key={"tasksOwn" + item.id} ref={"tasks" + item.id}
						onClick={() => this.clickItem(item)}
						className={this.props.recordId === item.id ? 'info' : ''}>
					<td>{item.stationName}</td>
					<td>
						{item.date !== '' ?  (new Date(item.date)).toLocaleDateString() : ''}
						<br/>
						{item.time}
					</td>
					<td>
						{this.getRecordView(item)}
					</td>
				</tr>
			))
		)
	},
	render: function() {
		return (
			<div ref={(el) => this.instance = el } style={{overflow:'auto'}}>
				<table className="table table-hover" style={{fontSize:'18px'}}>
					<tbody style={{cursor:'pointer'}}>
						{this.getRegistryOnlyOwn()}
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
	ownStations: 		state.drillStations,
	registry:				state.tasksRegistryCurrentFiltered,
	recordId: 			state.tasksRegistryCurrentRecordId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  openTasksRecordEdit: 	(value) 	=> dispatch(openTasksRecordEdit(value)),
  putTasksRegistryHeight: (value) => dispatch(putTasksRegistryHeight(value)),
	putRecordId: (value) 						=> dispatch(putTasksRegistryCurrentRecordId(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRegistryOwn);
