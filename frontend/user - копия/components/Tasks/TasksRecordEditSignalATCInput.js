import React from 'react'
import { putTasksFormEditSignalAtc } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var TasksRecordEditSignalATCInput = createReactClass({
	putMe() {
		let signalView = (
			this.refs.signal.value === 'kamal' ? 'КАМАЛ' : 'прочее'
		)
		let item = {
			signal: this.refs.signal.value,
			signalView: signalView,
			organization: this.refs.organization.value
		}
		this.props.putTasksFormEditSignalAtc(item)
	},
	render: function() {
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700
		}
		const styleFieldSelect = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px',
			height:'40px'
		}
		return (
			<div style={{cursor:'default'}}>
				<h4 style={styleFieldLabel}>СИГНАЛ</h4>
				<p><select className="combobox form-control" style={styleFieldSelect} 
						ref="signal" onChange={() => this.putMe()} 
						value={this.props.record.signal}>
					<option key="kamal" value="kamal">{'КАМАЛ'}</option>
					<option key="misc" value="misc">{'прочее'}</option>
				</select></p>
				<p><input placeholder="УЧРЕЖДЕНИЕ" type="text" value={this.props.record.organization}
						ref="organization" onChange={() => this.putMe()} 
						className="form-control" style={styleFieldInput} /></p>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	record: state.tasksFormEditSignalAtc
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksFormEditSignalAtc: (value) => dispatch(putTasksFormEditSignalAtc(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditSignalATCInput);
