import React from 'react'
import { connect } from 'react-redux'

import { archiveTasksRec } from '../../actions/tasksEdit';
import { putTasksFormEditState,
				 putTasksFormEditType,
				 putTasksWindowState } from '../../actions/tasks';
import { putUserForm } 	from '../../actions/hotkeys';

import createReactClass from 'create-react-class'

const TasksFuncPanelRecordEdit = createReactClass({
	goBack() {
		this.props.putUserForm('tasks');
		this.props.putTasksWindowState('registry');
	},
	confirmArchive() {
		$(this.refs.modalArchiveConfirm).show();
		$(this.refs.modalArchiveConfirm).modal({backdrop: false,keyboard: true});
	},
	archive() {
		if (this.props.archiveTasksRec('archiveTasksRec?sid=' + userSid, '') === true) {
			//this.props.putTasksWindowState('registry');
		}
	},
	confirmDelete() {
		$(this.refs.modalDeleteConfirm).show();
		$(this.refs.modalDeleteConfirm).modal({backdrop: false,keyboard: true});
	},
	deleteItem() {
		if (this.props.archiveTasksRec('archiveTasksRec?sid=' + userSid, 'delete') === true) {
			//this.props.putTasksWindowState('registry');
		}
	},
	hasAcceess() {
		let result = {display:''}
		for (let i = 0; i < this.props.cars.length; i++) {
			if (this.props.cars[i].returned !== true) {
				result = {display:'none'}
			}
		}
		return result;
	},
	render: function() {
		const styleButton 	= {cursor:'pointer',fontWeight:700,fontSize:'16px'};
		const styleBtnSave 	= {cursor:'pointer',fontWeight:700,fontSize:'18px'};
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
						<a style={{...styleButton,...this.hasAcceess()}} onClick={() => this.confirmArchive()}>
							{'ЗАКРЫТЬ В АРХИВ'}
						</a>
					</div>
					<div className="col-md-2">
					</div>
					<div className="col-md-2">
						<a style={{...styleButton,...{color:'#828282'},...this.hasAcceess()}} onClick={() => this.confirmDelete()}>
							{'УДАЛИТЬ'}
						</a>
					</div>
				</div>
				<div ref="modalArchiveConfirm" className="modal fade" tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title">{'ЗАКРЫТИЕ В АРХИВ'}</h4>
							</div>
							<div className="modal-body">
								<h4>{'ПРОДОЛЖИТЬ?'}</h4>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal"
									onClick={() => this.archive()}>
									ДА
								</button>
								<button type="button" className="btn btn-primary" data-dismiss="modal">НЕТ</button>
							</div>
						</div>
					</div>
				</div>
				<div ref="modalDeleteConfirm" className="modal fade" tabIndex="-1" role="dialog">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" style={{color:'red'}}>{'УДАЛЕНИЕ В АРХИВ'}</h4>
							</div>
							<div className="modal-body">
								<h4>{'ПРОДОЛЖИТЬ?'}</h4>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal"
									onClick={() => this.deleteItem()}>
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
	cars: state.tasksFormEdit.cars
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  putTasksFormEditState: 	(value) => dispatch(putTasksFormEditState(value)),
  putTasksFormEditType: 	(value) => dispatch(putTasksFormEditType(value)),
  putTasksWindowState: 		(value) => dispatch(putTasksWindowState(value)),
	//
	archiveTasksRec:				(value, mode) => dispatch(archiveTasksRec(value, mode))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksFuncPanelRecordEdit);
