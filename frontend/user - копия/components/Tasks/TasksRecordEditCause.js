import React from 'react'
import { connect } from 'react-redux'

import 	{ 
					putTasksFormEditCause,
					putTasksFormEditExtraInfo,
					saveTasksSignal
				} from '../../actions/tasksEdit'
import { putUserForm } 				from '../../actions/hotkeys';

import createReactClass from 'create-react-class';

import TasksRecordEditCauseInput from './TasksRecordEditCauseInput';
import ExtraInfo from './TasksRecordEditCauseExtraInfo';

import { Button } from 'reactstrap';

var TasksRecordEditCause = createReactClass({
	displaySubTypes() {
		return (
			this.props.record.subtypeView.length > 0 ? {display:''} : {display:'none'}
		);
	},
	openEdit() {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksFormEditCause(this.props.record);
		this.props.putTasksFormEditExtraInfo(this.props.extraInfo);
		this.openModalEdit();
	},
	saveEdit() {
		if (this.props.saveTasksSignal('cause','saveTasksSignal?sid=' + userSid) === true) {
			$(this.refs.modalFormEdit).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItem() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalEdit() {
		this.props.putUserForm('tasksViewRecCause');
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
					
					<h4 style={styleFieldLabel}>{'ПРОИСШЕСТВИЕ'}</h4>
					
					{this.putRecordField('typeView', '')}
					
					<div style={this.displaySubTypes()}>
						{this.putRecordField('subtypeView', '')}
					</div>
					
					<ExtraInfo/>
					
					{this.putRecordField('note', 'ПРИМЕЧАНИЕ')}
					
				</div>
				<div ref="modalFormEdit" id="tasksViewRecCauseModal" className="modal fade" 
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
										<TasksRecordEditCauseInput/>
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
	tasksTypes: 				state.tasksTypes,
	tasksSubTypes: 			state.tasksSubTypes,
	record: 						state.tasksFormEdit.cause,
	extraInfo:					state.tasksFormEdit.extraInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 								=> dispatch(putUserForm(item)),
  putTasksFormEditCause: (value) 			=> dispatch(putTasksFormEditCause(value)),
  putTasksFormEditExtraInfo: (value) 	=> dispatch(putTasksFormEditExtraInfo(value)),
	saveTasksSignal: (value1,value2) 		=> dispatch(saveTasksSignal(value1,value2))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCause);
