import React from 'react'
import { connect } from 'react-redux'

import 	{ 
					putTasksFormEditDate,
					putTasksFormEditTime,
					saveTasksSignal
				} from '../../actions/tasksEdit';
import { putUserForm } from '../../actions/hotkeys';

import createReactClass from 'create-react-class';

import TasksRecordEditDateInput from './TasksRecordEditDateInput';

import { Button } from 'reactstrap';


var TasksRecordEditDate = createReactClass({
	openEdit() {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksFormEditDate(this.props.workDay);
		this.props.putTasksFormEditTime(this.props.workTime);
		this.openModalEdit();
	},
	saveEdit() {
		if (this.props.saveTasksSignal('date','saveTasksSignal?sid=' + userSid) === true) {
			$(this.refs.modalFormEdit).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItem() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalEdit() {
		this.props.putUserForm('tasksViewRecDate');
		$(this.refs.modalFormEdit).show();
		$(this.refs.modalFormEdit).modal({backdrop: false, keyboard: false});
	},
	mouseHover(ref,color) {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.refs[ref].style.backgroundColor = color;
	},
	putRecordField(type, value,placeholder) {
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px'
		}
		const styleFieldInputEmpty = {
			fontSize:'18px',
			fontWeight:700,
			color: '#999',
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px'
		}
		if (type === 'date') {
			return (
				value === '' ? 
					<p style={styleFieldInputEmpty}>{placeholder}</p>
				: 
					<p style={styleFieldInput}>{(new Date(value)).toLocaleDateString()}</p>
			)
		} else {
			return (
				value === '' ? 
					<p style={styleFieldInputEmpty}>{placeholder}</p>
				: 
					<p style={styleFieldInput}>{value}</p>
			)
		}
	},
	isEditMode() {
		return (
			this.props.tasksFormEditState !== 'edit' ? {cursor:'default'}: {}
		)
	},
	render: function() {
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleBlock = {
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px',
			cursor: 'pointer',
			marginBottom: '3px'
		}
		return (
			<div>
				<div ref="block" style={{...styleBlock,...this.isEditMode()}} 
						onMouseEnter={() => this.mouseHover('block','#d9edf7')}
						onMouseLeave={() => this.mouseHover('block','white')}
						onClick={() => this.openEdit()}>
				
					<h4 style={styleFieldLabel}>{'ДАТА И ВРЕМЯ ОБРАЩЕНИЯ'}</h4>
					
					<div className="row">
						<div className="col-md-7">
							
							{this.putRecordField('date', this.props.workDay, 'ДАТА')}
							
						</div>
						<div className="col-md-5">
							
							{this.putRecordField('time', this.props.workTime, 'ВРЕМЯ')}
							
						</div>
					</div>
				</div>
				<div ref="modalFormEdit" className="modal fade tasksViewRecDateModal" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div style={{marginLeft:'30%'}}>
									<Button color="warning" style={{color:'black'}} data-dismiss="modal"
											onClick={() => this.saveEdit()}>
										<b>СОХРАНИТЬ</b>
									</Button>
									<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
											onClick={() => this.closeItem()}>
										<b>ЗАКРЫТЬ</b>
									</Button>
								</div>
							</div>
							<div className="modal-body">
								<div className="row">
									<div className="col-md-8 col-md-offset-2" style={styleBlock}>
										<TasksRecordEditDateInput/>
									</div>
								</div>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	tasksFormEditState: state.tasksFormEditState,
	workDay:						state.tasksFormEdit.date,
	workTime:						state.tasksFormEdit.time
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 							=> dispatch(putUserForm(item)),
	putTasksFormEditDate: (value) 		=> dispatch(putTasksFormEditDate(value)),
	putTasksFormEditTime: (value) 		=> dispatch(putTasksFormEditTime(value)),
	saveTasksSignal: (value1,value2) 	=> dispatch(saveTasksSignal(value1,value2))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditDate);
