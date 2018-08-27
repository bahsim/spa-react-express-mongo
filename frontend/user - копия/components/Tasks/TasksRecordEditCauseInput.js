import React from 'react'
import { selectTasksFormEditType,
				 selectTasksFormEditSubType,
				 refreshTasksFormEditCause } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';
import ExtraInfoInput from './TasksRecordEditCauseExtraInfoInput';

var TasksRecordEditCauseInput = createReactClass({
	selectType(e) {
		this.props.selectTasksFormEditType(
			this.refs.type.value
		);
	},
	selectSubType() {
		this.props.selectTasksFormEditSubType(this.refs.subtype.value);
	},
	inputNotes() {
		this.props.refreshTasksFormEditCause({
			note: this.refs.note.value
		})
	},
	displaySubTypes() {
		return (
			this.props.tasksSubTypes.length > 0 ? {display:''} : {display:'none'}
		)
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
		}
		const styleFieldSelect = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px',
			height:'40px'
		}
		return (
			<div style={{cursor:'default'}}>
				<h4 style={styleFieldLabel}>
					{'ПРОИСШЕСТВИЕ'}
				</h4>
				<p><select className="combobox form-control" style={styleFieldSelect} 
						ref="type" onChange={(e) => this.selectType(e)} 
						value={this.props.record.type}>
					{this.props.tasksTypes.map(
						(entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>
					)}
				</select></p>
				<div style={this.displaySubTypes()}>
					<p><select className="combobox form-control" style={styleFieldSelect}
						ref="subtype" onChange={() => this.selectSubType()}	value={this.props.record.subtype}>
						{this.props.tasksSubTypes.map(
							(entry) => <option key={entry.id} value={entry.id}>{entry.name}</option>
						)}
					</select></p>
				</div>
				<ExtraInfoInput/>
				<p><input placeholder="ПРИМЕЧАНИЕ" type="text" className="form-control" 
						style={styleFieldInput} value={this.props.record.note}
						ref="note" onChange={() => this.inputNotes()} /></p>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	tasksTypes: 		state.tasksTypes,
	tasksSubTypes: 	state.tasksSubTypes,
	record: 				state.tasksFormEditCause
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectTasksFormEditType: 		(value) => dispatch(selectTasksFormEditType(value)),
  selectTasksFormEditSubType: (value) => dispatch(selectTasksFormEditSubType(value)),
  refreshTasksFormEditCause: 	(value) => dispatch(refreshTasksFormEditCause(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCauseInput);
