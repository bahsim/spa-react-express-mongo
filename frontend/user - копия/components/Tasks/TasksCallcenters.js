import React from 'react'
import { selectTasksCallcenter, 
				 selectTasksCallcenterId, 
				 selectTasksCallcenterFlag, 
				 processTasksCallcenterSelect } from '../../actions/tasks';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const TasksCallcenters = createReactClass({
	componentDidUpdate() {
		//setTimeout(() => {
			this.instance.style.height = 
				( (window.innerHeight - this.instance0.getBoundingClientRect().height -this.instance.getBoundingClientRect().top)/2 - 25 ) + 'px';
			for (let ref in this.refs) {
				if (ref = 'tasks' + this.props.menuCurrentId) {
					//this.refs[ref].scrollIntoView();
				}
			}
		//}, 100)
	},
	selectItemAll(item) {
		this.props.selectMenu({});
		this.props.selectMenuId('TASKS_CALLCENTER_ALL');
		this.props.selectMenuFlag(true);
		this.props.processSelect({});
	},
	selectItem(item) {
		this.props.selectMenu(item);
		this.props.selectMenuId(item.id);
		this.props.selectMenuFlag(true);
		this.props.processSelect(item);
	},
	render: function() {
		return (
			<div>
				<div ref={(el) => this.instance0 = el } style={{overflow:'auto'}}>
					<table className="table table-hover" 
						style={{fontSize:'16px',fontWeight:'700',cursor:'pointer',marginBottom:'0px'}}>
						<tbody>
							<tr key={'TASKS_CALLCENTER_ALL'} style={{fontSize:'18px',textAlign:'center'}}
								onClick={() => this.selectItemAll()} 
								className={this.props.menuCurrentId === 'TASKS_CALLCENTER_ALL' ? 'info' : ''}>
								<td>ОБЛАСТЬ</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div ref={(el) => this.instance = el } style={{overflow:'auto'}}>
					<table className="table table-hover" 
						style={{fontSize:'16px',fontWeight:'700',cursor:'pointer'}}>
						<tbody>
							{this.props.items.map((item, index) => (
								<tr key={item.id} ref={"tasks" + item.id}
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
  menuCurrentId: 	state.tasksCallcenterId,
  items: 					state.callcenters,
	appMode:				state.appMode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	selectMenu: 		(value) 	=> dispatch(selectTasksCallcenter(value)),
  selectMenuId: 	(value) 	=> dispatch(selectTasksCallcenterId(value)),
  selectMenuFlag: (value) 	=> dispatch(selectTasksCallcenterFlag(value)),
	processSelect: 	(value) 	=> dispatch(processTasksCallcenterSelect(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksCallcenters);
