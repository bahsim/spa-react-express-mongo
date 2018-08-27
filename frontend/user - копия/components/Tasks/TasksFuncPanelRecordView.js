import React from 'react'
import { connect } from 'react-redux'

import { restoreTasksRec } from '../../actions/tasksEdit';
import { putTasksFormEditState,
				 putTasksFormEditType,
				 putTasksWindowState } from '../../actions/tasks';
import { putUserForm } 	from '../../actions/hotkeys';

import createReactClass from 'create-react-class'

const TasksFuncPanelRecordView = createReactClass({
	goBack() {
		this.props.putUserForm('tasks');
		this.props.putTasksWindowState('registry');
	},
	confirmRestore() {
		$(this.refs.modalRestoreConfirm).show();
		$(this.refs.modalRestoreConfirm).modal({backdrop: false,keyboard: true});
	},
	restoreItem() {
		if (this.props.restoreTasksRec('restoreTasksRec?sid=' + userSid) === true) {
			//this.props.putTasksWindowState('registry');
		}
	},
	hasAcceess() {
		const d1 = (new Date(this.props.record.dateEnd)).toLocaleDateString();
		const d2 = (new Date(this.props.workDay)).toLocaleDateString();
		return (
			d1 === d2 ? {display:''} : {display:'none'}
		)
	},
	isDeleted() {
		return (
			this.props.record.deleted ? {display:''} : {display:'none'}
		)
	},
	render: function() {
		const styleButton 	= {cursor:'pointer',fontWeight:700,fontSize:'16px'};
		const styleLabelDel = {color:'red',fontWeight:700,fontSize:'16px'};
		return (
			<div className="form-control">
				<div className="row">
					<div className="col-md-2">
						<a title="ESC" style={styleButton} onClick={() => this.goBack()}>
							{'<< НАЗАД'}
						</a>
					</div>
					<div className="col-md-1">
					</div>
					<div className="col-md-3">
						<a style={{...styleButton,...this.hasAcceess()}} onClick={() => this.confirmRestore()}>
							{'ВОССТАНОВИТЬ'}
						</a>
					</div>
					<div className="col-md-2">
					</div>
					<div className="col-md-2">
						<span style={{...styleLabelDel,...this.isDeleted()}}>
							{'УДАЛЕНО'}
						</span>
					</div>
				</div>
				<div ref="modalRestoreConfirm" className="modal fade" tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" style={{color:'red'}}>{'ВОССТАНОВЛЕНИЕ ИЗ АРХИВА'}</h4>
							</div>
							<div className="modal-body">
								<h4>{'ПРОДОЛЖИТЬ?'}</h4>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal"
									onClick={() => this.restoreItem()}>
									ДА
								</button>
								<button type="button" className="btn btn-primary" data-dismiss="modal">НЕТ</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	workDay:	state.workDay,
	record:		state.tasksFormEdit
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  restoreTasksRec: 				(value) => dispatch(restoreTasksRec(value)),
	putTasksFormEditState: 	(value) => dispatch(putTasksFormEditState(value)),
  putTasksFormEditType: 	(value) => dispatch(putTasksFormEditType(value)),
  putTasksWindowState: 		(value) => dispatch(putTasksWindowState(value)),
  filterTasksRegistryCurrent: () 	=> dispatch(filterTasksRegistryCurrent())
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksFuncPanelRecordView);
