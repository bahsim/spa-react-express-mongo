import React from 'react'
import 	{ connect } from 'react-redux'

import 	{
	putTasksFormEditCarsCombatItem,
	genTasksCombatCarsSelect,
	genTasksCombatCarsGroupEdit,
	putTasksCombatCarsGroupEditField
} 
	from '../../actions/tasksEditCars';
import 	{
	saveTasksCarsGroup,
	saveTasksCar,
	sendTasksCars,
	returnTasksCar
} 
	from '../../actions/tasksEdit';
import { putUserForm } from '../../actions/hotkeys';

import createReactClass from 'create-react-class';
import TasksRecordEditCarsCombatEdit 			from './TasksRecordEditCarsCombatEdit'
import TasksRecordEditCarsCombatSelect 		from './TasksRecordEditCarsCombatSelect'
import TasksRecordEditCarsCombatGroupEdit from './TasksRecordEditCarsCombatGroupEdit'

import { Button } from 'reactstrap';

var TasksRecordEditCarsCombat = createReactClass({
	componentDidUpdate() {
		this.instance.style.height 
			= ((this.props.recordHeight - this.instance0.getBoundingClientRect().height
					- this.instance.getBoundingClientRect().top) - 25 ) + 'px';
	},
	openEdit(item) {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksFormEditCarsCombatItem(item);
		this.openModalEdit();
	},
	saveEdit() {
		let complete = this.props.record.time1 !=='' && this.props.record.time2 !=='' && 
									 this.props.record.time3 !=='' && this.props.record.time4 !=='';
		if (complete) {
 			if (this.props.returnTasksCar('returnTasksCar?sid=' + userSid) === true) {
				$(this.refs.modalFormEdit).hide('modal');
				this.props.putUserForm('tasksViewRec');
			}
		} else {
			if (this.props.saveTasksCar('saveTasksCar?sid=' + userSid) === true) {
				$(this.refs.modalFormEdit).hide('modal');
				this.props.putUserForm('tasksViewRec');
			}
		}
	},
	closeItemEdit() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalEdit() {
		this.props.putUserForm('tasksViewRecCarsEdit');
		$(this.refs.modalFormEdit).show();
		$(this.refs.modalFormEdit).modal({backdrop: false, keyboard: false});
	},
	openGroupEdit(field) {
		if (this.props.tasksFormEditState !== 'edit') return;
		this.props.putTasksCombatCarsGroupEditField(field);
		this.props.genTasksCombatCarsGroupEdit(field);
		this.openModalGroupEdit();
	},
	saveGroupEdit() {
		if (this.props.saveTasksCarsGroup('saveTasksCarsGroup?sid=' + userSid) === true) {
			$(this.refs.modalFormGroupEdit).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItemGroup() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalGroupEdit() {
		this.props.putUserForm('tasksViewRecCarsGroup');
		$(this.refs.modalFormGroupEdit).show();
		$(this.refs.modalFormGroupEdit).modal({backdrop: false, keyboard: false});
	},
	openSelect() {
		this.props.genTasksCombatCarsSelect();
		this.openModalSelect();
	},
	saveSelect() {
		if (this.props.sendTasksCars('sendTasksCars?sid=' + userSid) === true) {
			$(this.refs.modalFormSelect).hide('modal');
			this.props.putUserForm('tasksViewRec');
		}
	},
	closeItemSelect() {
		this.props.putUserForm('tasksViewRec');
	},
	openModalSelect() {
		this.props.putUserForm('tasksViewRecCarsSelect');
		$(this.refs.modalFormSelect).show();
		$(this.refs.modalFormSelect).modal({backdrop: false, keyboard: false});
	},
	showTime(t) {
		return ( t !== '' ?  t : '--:--')
	},
	isEditMode() {
		return (
			this.props.tasksFormEditState !== 'edit' ? {cursor:'default'}: {cursor:'pointer'}
		)
	},
	render: function() {
		const styleTableHead = {
			fontSize:'18px',
			color:'#828282',
			padding:'2px',
			textAlign:'center'
		}
		const styleTableRow = {
			fontSize:'18px',
			textAlign:'center'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px'
		}
		const styleBtnFuncPanel = {
			cursor:'pointer',
			fontSize:'16px',
			fontWeight:700
		};
		const styleBtnFuncPanelArray = {
			color:'#828282',
			fontSize:'16px',
			fontWeight:700
		};
		return (
			<div>
				<div className="form-control" style={{fontSize:'16px'}}
					ref={(el) => this.instance0 = el }>
					<div className="row">
						<div className="col-md-3 col-md-offset-2">
							{this.props.tasksFormEditState === 'edit' ? 
								<a style={styleBtnFuncPanel} onClick={() => this.openSelect()}>
									{'НОВАЯ ВЫСЫЛКА'}
								</a>
							: 
								''
							}
						</div>
						<div className="col-md-7">
							{this.props.tasksFormEditState === 'edit' ? 
								<div>
									<a style={styleBtnFuncPanel} onClick={() => this.openGroupEdit('time1')}>
										{'ВЫЕЗД'}
									</a>
									<span style={styleBtnFuncPanelArray}>
										&nbsp;&nbsp;&nbsp;{'>'}&nbsp;&nbsp;&nbsp;
									</span>
									<a style={styleBtnFuncPanel} onClick={() => this.openGroupEdit('time2')}>
										{'ПРИБЫТИЕ'}
									</a>
									<span style={styleBtnFuncPanelArray}>
										&nbsp;&nbsp;&nbsp;{'>'}&nbsp;&nbsp;&nbsp;
									</span>
									<a style={styleBtnFuncPanel} onClick={() => this.openGroupEdit('time3')}>
										{'ВОЗВРАЩЕНИЕ'}
									</a>
									<span style={styleBtnFuncPanelArray}>
										&nbsp;&nbsp;&nbsp;{'>'}&nbsp;&nbsp;&nbsp;
									</span>
									<a style={styleBtnFuncPanel} onClick={() => this.openGroupEdit('time4')}>
										{'ПРИБЫТИЕ'}
									</a>
								</div>
							: 
								''
							}
						</div>
					</div>
				</div>
				<div ref={(el) => this.instance = el } 
						style={{padding:'0px 15px 0px 15px',overflow:'auto'}}>
					<div className="row">
						<table className="table table-hover" style={this.isEditMode()}>
							<thead>
								<tr>
									<th style={{...styleTableHead,...{width:'16%'}}}>{'ПЧ'}</th>
									<th style={{...styleTableHead,...{width:'5%'}}}>{'б/н'}</th>
									<th style={{...styleTableHead,...{width:'25%'}}}>{'марка'}</th>
									<th style={{...styleTableHead,...{width:'9%'}}}>{'ГДЗ'}</th>
									<th style={{...styleTableHead,...{width:'9%'}}}>{'ОСТ'}</th>
									<th style={{...styleTableHead,...{width:'9%'}}}>{'выезд'}</th>
									<th style={{...styleTableHead,...{width:'9%'}}}>{'приб.'}</th>
									<th style={{...styleTableHead,...{width:'9%'}}}>{'возвр.'}</th>
									<th style={{...styleTableHead,...{width:'9%'}}}>{'приб.'}</th>
								</tr>
							</thead>
							<tbody>
								{this.props.registry.map((item, index) => (
									<tr key={"taskCarsCombat_" + item.id + '_' + index} ref={"tasks" + item.id} 
											onClick={() => this.openEdit(item)}>
										<td style={styleTableRow}>{item.stationName}</td>
										<td style={styleTableRow}>{item.bortNomer}</td>
										<td style={styleTableRow}>{item.name}</td>
										<td style={styleTableRow}>{item.GDZ}</td>
										<td style={styleTableRow}>{item.OST}</td>
										<td style={styleTableRow}>{this.showTime(item.time1)}</td>
										<td style={styleTableRow}>{this.showTime(item.time2)}</td>
										<td style={styleTableRow}>{this.showTime(item.time3)}</td>
										<td style={styleTableRow}>{this.showTime(item.time4)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div ref="modalFormEdit" id="tasksViewRecCarsEditModal" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								
								{this.props.record.returned === true ?
									<div align='center'>
										<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
											onClick={() => this.closeItemEdit()}>
											<b>ЗАКРЫТЬ</b>
										</Button>
									</div>
								:
									<div style={{marginLeft:'30%'}}>
										<Button color="warning" style={{color:'black'}} 
												onClick={() => this.saveEdit()}>
											<b>СОХРАНИТЬ</b>
										</Button>
										<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
											onClick={() => this.closeItemEdit()}>
											<b>ЗАКРЫТЬ</b>
										</Button>
									</div>
								}
								
							</div>
							<div className="modal-body">
								<TasksRecordEditCarsCombatEdit/>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
				<div ref="modalFormSelect" id="tasksViewRecCarsSelectModal" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div style={{marginLeft:'30%'}}>
									<Button color="warning" style={{color:'black'}}
											onClick={() => this.saveSelect()}>
										<b>ВЫСЛАТЬ</b>
									</Button>
									<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
											onClick={() => this.closeItemSelect()}>
										<b>ЗАКРЫТЬ</b>
									</Button>
								</div>
							</div>
							<div className="modal-body">
								<TasksRecordEditCarsCombatSelect/>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
				<div ref="modalFormGroupEdit" id="tasksViewRecCarsGroupModal" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div style={{marginLeft:'30%'}}>
									<Button color="warning" style={{color:'black'}}
											onClick={() => this.saveGroupEdit()}>
										<b>СОХРАНИТЬ</b>
									</Button>
									<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
											onClick={() => this.closeItemGroup()}>
										<b>ЗАКРЫТЬ</b>
									</Button>
								</div>
							</div>
							<div className="modal-body">
								<TasksRecordEditCarsCombatGroupEdit/>
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
	registry:						state.tasksFormEdit.cars,
	record: 						state.tasksFormEditCarsCombatItem
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 							=> dispatch(putUserForm(item)),
	//
	putTasksFormEditCarsCombatItem: (value) => dispatch(putTasksFormEditCarsCombatItem(value)),
	genTasksCombatCarsSelect: (value) 			=> dispatch(genTasksCombatCarsSelect(value)),
	genTasksCombatCarsGroupEdit: (value) 		=> dispatch(genTasksCombatCarsGroupEdit(value)),
	putTasksCombatCarsGroupEditField: (value) => dispatch(putTasksCombatCarsGroupEditField(value)),
	//
	saveTasksCarsGroup: (value) 	=> dispatch(saveTasksCarsGroup(value)),
	saveTasksCar: (value) 				=> dispatch(saveTasksCar(value)),
	sendTasksCars: (value) 				=> dispatch(sendTasksCars(value)),
	returnTasksCar: (value) 			=> dispatch(returnTasksCar(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCarsCombat);
