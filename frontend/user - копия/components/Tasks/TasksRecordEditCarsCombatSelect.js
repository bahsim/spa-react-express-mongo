import React from 'react'
import { connect } from 'react-redux'
import { checkTasksCombatCarSelected } from '../../actions/tasksEditCars'
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const TasksRecordEditCarsCombatSelect = createReactClass({
	selectItem(id) {
		this.props.checkTasksCombatCarSelected(id);
	},
	getCarsBusy() {
		const styleTableRow = {
			fontSize:'18px',
			//padding:'2px',
			textAlign:'center'
		};
		let output = [];
		let stations = this.props.stations;
		let cars = this.props.carsBusy
		for (let i = 0; i < stations.length; i++) {
			for (let j = 0; j < cars.length; j++) {
				if (stations[i].id === cars[j].stationId) {
					output.push(cars[j]);
					break;
				}
			}
		}
		return (
			output.map((item, index) => (
				<tr key={"taskCarsCombatBusy_" + item.id} ref={"tasks" + item.id}>
					<td style={styleTableRow}>{item.stationName}</td>
					<td style={styleTableRow}>{item.bortNomer}</td>
					<td style={styleTableRow}>{item.name}</td>
					<td style={styleTableRow}>{item.GDZ}</td>
					<td style={styleTableRow}>{item.OST}</td>
				</tr>
			))
		)
	},
	render: function() {
		const styleTableHead = {
			fontSize:'18px',
			color:'#828282',
			padding:'2px',
			textAlign:'center'
		}
		const styleTableRow = {
			fontSize:'18px',
			//padding:'2px',
			textAlign:'center'
		}
		const styleFieldLabel = {
			fontSize:'18px',
			color:'#828282'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px'
		}
		const styleButton = {
			fontSize:'14px',
			fontWeight:700,
		}
		return (
			<div>
				<h4 style={styleFieldLabel}>{'СВОБОДНО'}</h4>
				<table className="table table-hover">
					<thead>
						<tr>
							<th style={{...styleTableHead,...{width:'25%'}}}>{'ПЧ'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'б/н'}</th>
							<th style={{...styleTableHead,...{width:'35%'}}}>{'марка'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'ГДЗ'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'ОСТ'}</th>
						</tr>
					</thead>
					<tbody>
						{this.props.carsSelect.map((item, index) => (
							<tr key={"taskCarsCombatFree_" + item.id} style={{cursor:'pointer'}}
									ref={"tasks" + item.id} className={item.selected ? 'info' : ''}
									onClick={() => this.selectItem(item.id)}>
								<td style={styleTableRow}>{item.stationName}</td>
								<td style={styleTableRow}>{item.bortNomer}</td>
								<td style={styleTableRow}>{item.name}</td>
								<td style={styleTableRow}>{item.GDZ}</td>
								<td style={styleTableRow}>{item.OST}</td>
							</tr>
						))}
					</tbody>
				</table>
				<h4 style={styleFieldLabel}>{'ЗАНЯТО'}</h4>
				<table className="table">
					<thead>
						<tr>
							<th style={{...styleTableHead,...{width:'25%'}}}>{'ПЧ'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'б/н'}</th>
							<th style={{...styleTableHead,...{width:'35%'}}}>{'марка'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'ГДЗ'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'ОСТ'}</th>
						</tr>
					</thead>
					<tbody>
						{this.getCarsBusy()}
					</tbody>
				</table>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	carsSelect: state.tasksCombatCarsSelect,
	carsBusy: 	state.tasksBusyCars,
	stations:		state.drillStations
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  checkTasksCombatCarSelected: (value) => dispatch(checkTasksCombatCarSelected(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCarsCombatSelect);
