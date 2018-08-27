import React from 'react'
import { selectTasksStation, 
				 selectTasksStationId, 
				 selectTasksStationFlag, 
				 processTasksStationSelect } from '../../actions/tasks';
import { putTasksFormEditStationId } from '../../actions/tasksEdit';

import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const TasksStations = createReactClass({
	componentDidUpdate() {
		//setTimeout(() => {
			this.instance.style.height = 
				( (window.innerHeight - this.instance0.getBoundingClientRect().height -this.instance.getBoundingClientRect().top) - 25 ) + 'px'
		//}, 100)
	},
	selectItemAll(item) {
		this.props.selectMenu({});
		this.props.selectMenuId('TASKS_STATION_ALL');
		this.props.selectMenuFlag(true);
		this.props.processSelect({});
	},
	selectItem(item) {
		this.props.selectMenu(item);
		this.props.selectMenuId(item.id);
		this.props.selectMenuFlag(true);
		this.props.processSelect(item);
		//
		this.props.putTasksFormEditStationId(item.id);
	},
	menuCurrentId() {
		return this.props.menuCurrent ? this.props.menuCurrent.id : ''
	},
	render: function() {
		return (
			<div>
				<div ref={(el) => this.instance0 = el } style={{overflow:'auto'}}>
					<table className="table table-hover" 
						style={{fontSize:'16px',fontWeight:'700',cursor:'pointer',marginBottom:'0px'}}>
						<tbody>
							<tr key={'TASKS_STATION_ALL'}
								onClick={() => this.selectItemAll()} style={{fontSize:'18px',textAlign:'center'}}
								className={this.props.menuCurrentId === 'TASKS_STATION_ALL' ? 'info' : ''}>
								<td>ЦОУСС</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div ref={(el) => this.instance = el } style={{overflow:'auto'}}>
					<table className="table table-hover" 
						style={{fontSize:'16px',fontWeight:'700',cursor:'pointer'}}>
						<tbody>
							{this.props.items.map((item, index) => (
								<tr key={item.id}
									onClick={() => this.selectItem(item)}
									className={this.props.menuCurrentId === item.id ? 'info' : ''}>
									<td>{item.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	menuCurrent: 	state.tasksStation,
  menuCurrentId:state.tasksStationId,
  items: 				state.tasksStations,
  appMode: 			state.appMode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	selectMenu: 		(value) => dispatch(selectTasksStation(value)),
  selectMenuId: 	(value) => dispatch(selectTasksStationId(value)),
  selectMenuFlag: (value) => dispatch(selectTasksStationFlag(value)),
	processSelect: 	(value) => dispatch(processTasksStationSelect(value)),
	//
	putTasksFormEditStationId: (value) => dispatch(putTasksFormEditStationId(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksStations);
