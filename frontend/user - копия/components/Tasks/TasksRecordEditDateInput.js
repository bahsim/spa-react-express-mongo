import React from 'react'
import { putTasksFormEditDate,
				 putTasksFormEditTime } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var TasksRecordEditDateInput = createReactClass({
	changeDate() {
		this.props.putTasksFormEditDate(this.refs.dateInput.value);
	},
	changeTime() {
		this.props.putTasksFormEditTime(this.refs.timeInput.value);
	},
	render: function() {
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px'
		}
		return (
			<div style={{cursor:'default'}}>
				<h4 style={styleFieldLabel}>{'ДАТА И ВРЕМЯ ОБРАЩЕНИЯ'}</h4>
				<div className="row">
					<div className="col-md-7">
						<input ref="dateInput" type="date" 
							value={this.props.workDay !== '' ? this.props.workDay : ''} 
							onChange={() => this.changeDate()}
							className="form-control" style={styleFieldInput} />
					</div>
					<div className="col-md-5">
						<input ref="timeInput" type="time" 
							value={this.props.workTime !== '' ? this.props.workTime : ''} 
							onChange={() => this.changeTime()}
							className="form-control" style={styleFieldInput} />
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	workDay:	state.tasksFormEditDate,
	workTime:	state.tasksFormEditTime
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksFormEditDate: (value) => dispatch(putTasksFormEditDate(value)),
  putTasksFormEditTime: (value) => dispatch(putTasksFormEditTime(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditDateInput);
