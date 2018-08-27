import React from 'react'
import { putTasksFormEditStationId,
				 putTasksFormEditCallcenterId } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var TasksRecordEditDateInput = createReactClass({
	selectCallcenter() {
		if (this.refs.callcenter.value === '') return;
		this.props.putTasksFormEditCallcenterId(this.refs.callcenter.value);
		this.props.putTasksFormEditStationId('');
	},
	selectStation() {
		if (this.refs.station.value === '') return;
		this.props.putTasksFormEditStationId(this.refs.station.value);
	},
	showCallcenters() {
		let output = [];
		let centers = this.props.centers;
		let items = this.props.items;
		for (let i = 0; i < centers.length; i++) {
			for (let j = 0; j < items.length; j++) {
				if (centers[i].id === items[j].callcenterId) {
					output.push(centers[i]);
					break;
				}
			}
		}
		return (
			output.map(
				(entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>
			)
		);
	},
	showStations() {
		let output = [];
		this.props.items.forEach((item) => {
			if (item.callcenterId === this.props.callcenterId) {
				output.push(item);
			}
		});
		return (
			output.map(
				(entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>
			)
		);
	},
	render: function() {
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldSelect = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px',
			height:'40px'
		}
		return (
			<div style={{cursor:'default'}}>
				<h4 style={styleFieldLabel}>{'ПОЖАРНАЯ ЧАСТЬ'}</h4>
				<p><select className="combobox form-control" style={styleFieldSelect}
					ref="callcenter" onChange={() => this.selectCallcenter()}	value={this.props.callcenterId}>
						<option key={'EMPTY'} value={''} style={{color:'#999'}}>ВЫБРАТЬ...</option>
						{this.showCallcenters()}
				</select></p>
				<p><select className="combobox form-control" style={styleFieldSelect}
					ref="station" onChange={() => this.selectStation()}	value={this.props.stationId}>
						<option key={'EMPTY'} value={''} style={{color:'#999'}}>ВЫБРАТЬ...</option>
						{this.showStations()}
				</select></p>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
  centers:					state.callcenters,
	items: 						state.drillStations,
  callcenterId: 		state.tasksFormEditCallcenterId,
	stationId:				state.tasksFormEditStationId,
	ownCallcenterId: 	state.user.callcenterId,
	ownStationId: 		state.user.stationId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksFormEditStationId: (value) 		=> dispatch(putTasksFormEditStationId(value)),
  putTasksFormEditCallcenterId: (value) => dispatch(putTasksFormEditCallcenterId(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditDateInput);
