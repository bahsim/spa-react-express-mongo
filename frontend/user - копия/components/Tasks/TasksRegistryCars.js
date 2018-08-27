import React from 'react'
import { connect } from 'react-redux'
import 	{ 
					putTasksRegistryHeight,
					putTasksRegistryCurrentRecordId,
					openTasksRecordEditFromCar 
				} from '../../actions/tasks';
import createReactClass from 'create-react-class'

const TasksRegistryCars = createReactClass({
	componentDidUpdate() {
		this.instance.style.height = this.props.registryHeight
	},
	clickItem(item) {
		if (item.busy !== true) return;
		if (item.info === undefined) return;
		this.props.openRecord(item);
	},
	render: function() {
		const styleTableRow = {
			fontSize:'18px',
			//padding:'2px',
			textAlign:'center'
		}
		const styleTableHead = {
			fontSize:'18px',
			color:'#828282',
			padding:'2px',
			textAlign:'center'
		}
		return (
			<div ref={(el) => this.instance = el } style={{overflow:'auto'}}>
				<table className="table table-hover" style={{fontSize:'18px'}}>
					<thead>
						<tr>
							<th style={{...styleTableHead,...{width:'20%'}}}>{'ПЧ'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'г/н'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'б/н'}</th>
							<th style={{...styleTableHead,...{width:'25%'}}}>{'марка'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'ГДЗ'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'ОСТ'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'время'}</th>
						</tr>
					</thead>
					<tbody>
						{this.props.registry.map((item, index) => (
							<tr key={"tasksCurrent" + item.id} ref={"tasks" + item.id}
									onClick={() => this.clickItem(item)} 
									className={item.busy ? 'info' : ''}
									style={item.busy ? {cursor:'pointer'} : {cursor:'default'}}>
								<td style={styleTableRow}>{item.stationName}</td>
								<td style={styleTableRow}>{item.gosNomer}</td>
								<td style={styleTableRow}>{item.bortNomer}</td>
								<td style={styleTableRow}>{item.name}</td>
								<td style={styleTableRow}>{item.GDZ}</td>
								<td style={styleTableRow}>{item.OST}</td>
								<td style={styleTableRow}>{item.info ? item.info.time : ''}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	appMode: 			state.appMode,
	windowState: 	state.tasksWindowState,
	registryHeight:	state.tasksRegistryHeight,
	registry:			state.tasksCombatCarsRegistry,
	recordId: 		state.tasksRegistryCurrentRecordId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  openRecord: (value) => dispatch(openTasksRecordEditFromCar(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRegistryCars);
