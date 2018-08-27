import React from 'react'
import { connect } from 'react-redux'

import { putTasksFormEditStats, 
				 saveTasksStats } from '../../actions/tasksEdit';
import { putUserForm } from '../../actions/hotkeys';

import createReactClass from 'create-react-class';

import TasksRecordEditStatsInput from './TasksRecordEditStatsInput';

import { Button } from 'reactstrap';

var TasksRecordEditStats = createReactClass({
	componentDidUpdate() {
		this.instance.style.height 
			= ((this.props.recordHeight - this.instance0.getBoundingClientRect().height
					- this.instance.getBoundingClientRect().top) - 25 ) + 'px';
	},
	openEdit() {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksFormEditStats(this.props.record);
		this.openModalEdit();
	},
	saveEdit() {
		if (this.props.saveTasksStats('saveTasksStats?sid=' + userSid) === true) {
			$(this.refs.modalFormEdit).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItem() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalEdit() {
		this.props.putUserForm('tasksViewRecStats');
		$(this.refs.modalFormEdit).show();
		$(this.refs.modalFormEdit).modal({backdrop: false, keyboard: false});
	},
	mouseHover(ref,color) {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.refs[ref].style.backgroundColor = color;
	},
	isEditMode() {
		return (
			this.props.tasksFormEditState !== 'edit' ? {cursor:'default'}: {}
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
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px'
		}
		const styleBlock = {
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px',
			cursor: 'pointer',
			marginBottom: '3px'
		}
		const styleButton = {
			fontSize:'14px',
			fontWeight:700,
		}
		return (
			<div>
				<div className="form-control" style={{fontSize:'16px'}}
					ref={(el) => this.instance0 = el }>
					<div className="row">
						<div className="col-md-3 col-md-offset-2">
						</div>
					</div>
				</div>
				<div ref={(el) => this.instance = el } 
						style={{padding:'0px 15px 0px 15px',overflow:'auto'}}>
					<br/><br/><br/>
					<div className="row">
						<div className="col-md-5 col-md-offset-3" 
								ref="block" style={{...styleBlock,...this.isEditMode()}}
								onMouseEnter={() => this.mouseHover('block','#d9edf7')}
								onMouseLeave={() => this.mouseHover('block','white')}
								onClick={() => this.openEdit()}>
							<br/>
							<div className="row">
								<div className="col-md-6 col-md-offset-1">
									<h4 style={styleFieldLabel}>{'ЛОКАЛИЗАЦИЯ'}</h4>
								</div>
								<div className="col-md-3">
									<p style={styleFieldInput}>
										{this.props.record.localization !== '' ? this.props.record.localization : '--:--'}
									</p>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 col-md-offset-1">
									<h4 style={styleFieldLabel}>{'ЛИКВИДАЦИЯ'}</h4>
								</div>
								<div className="col-md-3">
									<p style={styleFieldInput}>
										{this.props.record.liquidation !== '' ? this.props.record.liquidation : '--:--'}
									</p>
								</div>
							</div>
							<br/>
						</div>
					</div>
				</div>
				<div ref="modalFormEdit" id="tasksViewRecStatsModal" className="modal fade" 
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
									<div className="col-md-10 col-md-offset-1" style={styleBlock}>
										<TasksRecordEditStatsInput/>
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
	recordHeight: 			state.tasksRecordHeight,
	record:							state.tasksFormEdit.stats
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  putTasksFormEditStats: (value) 	=> dispatch(putTasksFormEditStats(value)),
	saveTasksStats: (value) 				=> dispatch(saveTasksStats(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditStats);
