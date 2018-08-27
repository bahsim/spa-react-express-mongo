import React from 'react'
import { connect } from 'react-redux'

import { putTasksFormEditCaller,
				 saveTasksSignal } 	from '../../actions/tasksEdit';
import { putUserForm } 			from '../../actions/hotkeys';

import createReactClass from 'create-react-class';

import TasksRecordEditCallerInput from './TasksRecordEditCallerInput';

import { Button } from 'reactstrap';

var TasksRecordEditCaller = createReactClass({
	openEdit() {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksFormEditCaller(this.props.record);
		this.openModalEdit();
	},
	saveEdit() {
		if (this.props.saveTasksSignal('caller','saveTasksSignal?sid=' + userSid) === true) {
			$(this.refs.modalFormEdit).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItem() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalEdit() {
		this.props.putUserForm('tasksViewRecCaller');
		$(this.refs.modalFormEdit).show();
		$(this.refs.modalFormEdit).modal({backdrop: false, keyboard: false});
	},
	mouseHover(ref,color) {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.refs[ref].style.backgroundColor = color;
	},
	putRecordField(name,placeholder) {
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
		return (
			this.props.record[name] === '' ? 
				<p style={styleFieldInputEmpty}>{placeholder}</p>
			: 
				<p style={styleFieldInput}>{this.props.record[name]}</p>
		)
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
					
					<h4 style={styleFieldLabel}>{'ЗАЯВИТЕЛЬ'}</h4>
					
					{this.putRecordField('surname',		'ФАМИЛИЯ')}
					{this.putRecordField('firstname',	'ИМЯ')}
					{this.putRecordField('middlename','ОТЧЕСТВО')}
					{this.putRecordField('post',			'ДОЛЖНОСТЬ')}
					{this.putRecordField('telephone',	'ТЕЛЕФОН')}
					{this.putRecordField('adress',		'АДРЕС')}
					
				</div>
				<div ref="modalFormEdit" id="tasksViewRecCallerModal" className="modal fade" 
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
										<TasksRecordEditCallerInput/>
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
	record: 						state.tasksFormEdit.caller
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  putTasksFormEditCaller: (value) => dispatch(putTasksFormEditCaller(value)),
	saveTasksSignal: (value1,value2) => dispatch(saveTasksSignal(value1,value2))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCaller);
