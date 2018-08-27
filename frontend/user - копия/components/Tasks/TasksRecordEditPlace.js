import React from 'react'
import { connect } from 'react-redux'

import { putTasksFormEditPlace,
				 saveTasksSignal } 	from '../../actions/tasksEdit';
import { putUserForm } 			from '../../actions/hotkeys';

import createReactClass from 'create-react-class';

import TasksRecordEditPlaceInput from './TasksRecordEditPlaceInput';

import { Button } from 'reactstrap';

var TasksRecordEditPlace = createReactClass({
	displayMe(value) {
		return (
			this.props.record.type === value ? {display:''} : {display:'none'}
		)
	},
	openEdit() {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksFormEditPlace(this.props.record)
		this.openModalEdit();
	},
	saveEdit() {
		if (this.props.saveTasksSignal('place','saveTasksSignal?sid=' + userSid) === true) {
			$(this.refs.modalFormEdit).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItem() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalEdit() {
		this.props.putUserForm('tasksViewRecPlace');
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
		let value = this.props.record[name]
		return (
			value === '' ? 
				<p style={styleFieldInputEmpty}>{placeholder}</p>
			: 
				<p style={styleFieldInput}>{value}</p>
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
		const styleSelect = {fontSize:'17px',fontWeight:700}
		return (
			<div>
				<div ref="block" style={{...styleBlock,...this.isEditMode()}} 
						onMouseEnter={() => this.mouseHover('block','#d9edf7')}
						onMouseLeave={() => this.mouseHover('block','white')}
						onClick={() => this.openEdit()}>
					
					<h4 style={styleFieldLabel}>{'МЕСТОРАСПОЛОЖЕНИЕ'}</h4>
					
					{this.putRecordField('region', '')}
					{this.putRecordField('typeView', '')}
					
					<div style={this.displayMe('country')}>
						
						{this.putRecordField('note', 'ОРИЕНТИРЫ')}
						
					</div>
					<div style={this.displayMe('urban')}>
						
						{this.putRecordField('town', 'НАСЕЛЕННЫЙ ПУНКТ')}
						{this.putRecordField('street', 'УЛИЦА')}
						{this.putRecordField('number', 'ДОМ')}
						
					</div>
					
				</div>
				<div ref="modalFormEdit" id="tasksViewRecPlaceModal" className="modal fade" 
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
										<TasksRecordEditPlaceInput/>
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
	record: 						state.tasksFormEdit.place
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 							=> dispatch(putUserForm(item)),
  putTasksFormEditPlace: (value) 		=> dispatch(putTasksFormEditPlace(value)),
	saveTasksSignal: (value1,value2) 	=> dispatch(saveTasksSignal(value1,value2))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditPlace);
