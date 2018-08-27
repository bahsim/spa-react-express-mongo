import React from 'react'
import { connect } from 'react-redux'
import { refreshTasksCombatCarsGroupEdit } from '../../actions/tasksEditCars'
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const TasksRecordEditCarsCombatGroupEdit = createReactClass({
	refreshField(e, id) {
		this.props.refreshTasksCombatCarsGroupEdit(
			this.props.field, 
			id, 
			e.target.value
		);
	},
	putMeAuto(id) {
		let d = new Date();
		let h = d.getHours();
		let m = d.getMinutes();
		h = (h < 10 ? '0' + h : h);
		m = (m < 10 ? '0' + m : m);
		this.props.refreshTasksCombatCarsGroupEdit(
			this.props.field, 
			id, 
			h + ':' + m
		);
	},
	getHeader() {
		switch (this.props.field) {
			case 'time1': return 'ВЫЕЗД С ПОЖАРНОЙ ЧАСТИ'
			case 'time2': return 'ПРИБЫТИЕ НА ОБЪЕКТ'
			case 'time3': return 'ВОЗВРАЩЕНИЕ С ОБЪЕКТА'
			case 'time4': return 'ПРИБЫТИЕ В ПОЖАРНУЮ ЧАСТЬ'
		}
	},
	displayBtn(t) {
		return (
			t === '' ? {display:''} : {display:'none'}
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
				<h4 style={styleFieldLabel}>{this.getHeader()}</h4>
				<table className="table table-hover">
					<thead>
						<tr>
							<th style={{...styleTableHead,...{width:'25%'}}}>{'ПЧ'}</th>
							<th style={{...styleTableHead,...{width:'8%'}}}>{'б/н'}</th>
							<th style={{...styleTableHead,...{width:'35%'}}}>{'марка'}</th>
							<th style={{...styleTableHead,...{width:'20%'}}}>{'время'}</th>
							<th style={{...styleTableHead,...{width:'12%'}}}></th>
						</tr>
					</thead>
					<tbody>
						{this.props.registry.map((item, index) => (
							<tr key={"taskCarsCombatFree_" + item.id} style={{cursor:'pointer'}}>
								<td style={styleTableRow}>{item.stationName}</td>
								<td style={styleTableRow}>{item.bortNomer}</td>
								<td style={styleTableRow}>{item.name}</td>
								<td style={styleTableRow}>
									<input type="time" className="form-control"
										value={item[this.props.field]} style={styleFieldInput} 
										onChange={(e) => this.refreshField(e, item.id)} />
								</td>
								<td style={styleTableRow}>
									<Button color="default" onClick={() => this.putMeAuto(item.id)}
											style={{...styleButton, ...this.displayBtn(item[this.props.field])}}>
										{'СЕЙЧАС'}
									</Button>
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
	registry: state.tasksCombatCarsGroupEdit,
	field:		state.tasksCombatCarsGroupEditField
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshTasksCombatCarsGroupEdit: (field, id, value) => dispatch(refreshTasksCombatCarsGroupEdit(field, id, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCarsCombatGroupEdit);
