import React from 'react'
import { connect } from 'react-redux'
import { saveTasksNewRec } from '../../actions/tasksEdit';

import { putTasksFormEditState,
				 putTasksFormEditType,
				 putTasksWindowState } from '../../actions/tasks';
import { putUserForm } 	from '../../actions/hotkeys';

import createReactClass from 'create-react-class'

const TasksFuncPanelRecordNew = createReactClass({
	goBack() {
		this.props.putUserForm('tasks');
		this.props.putTasksWindowState('registry');
	},
	saveNew() {
		if (this.props.saveTasksNewRec('saveTasksNewRec?sid=' + userSid) === true) {
			this.props.putTasksWindowState('registry');
		}
	},
	render: function() {
		const styleBtnBack 	= {cursor:'pointer',fontWeight:700,fontSize:'16px'};
		const styleBtnSave 	= {cursor:'pointer',fontWeight:700,fontSize:'18px'};
		return (
			<div className="form-control">
				<div className="row">
					<div className="col-md-2">
						<a title="ESC" style={styleBtnBack} onClick={() => this.goBack()}>
							{'<< НАЗАД'}
						</a>
					</div>
					<div className="col-md-2">
					</div>
					<div className="col-md-4">
						<div style={{marginTop:'-3px'}}>
							<a style={styleBtnSave} onClick={() => this.saveNew()}>
								{'>> РЕГИСТРИРОВАТЬ <<'}
							</a>
						</div>
					</div>
					<div className="col-md-2">
					</div>
					<div className="col-md-2">
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	//
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  saveTasksNewRec: 				(value) => dispatch(saveTasksNewRec(value)),
  putTasksFormEditState: 	(value) => dispatch(putTasksFormEditState(value)),
  putTasksFormEditType: 	(value) => dispatch(putTasksFormEditType(value)),
  putTasksWindowState: 		(value) => dispatch(putTasksWindowState(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksFuncPanelRecordNew);
