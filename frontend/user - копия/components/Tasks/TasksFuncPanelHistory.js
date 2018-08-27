import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'
import { putTasksRegistryHistoryPeriod,
					getTasksRegistryHistory } from '../../actions/tasks';

import { Button } from 'reactstrap';

const TasksFuncPanelHistory = createReactClass({
	selectPeriod() {
		this.openModalEdit();
	},
	setPeriodWorkDay() {
		//
		let workDate = new Date(this.props.workDay);
		let year = workDate.getFullYear();
		let month = workDate.getMonth() + 1;
		let day = workDate.getDate();
		month = (month<10 ? '0' + month : month);
		day = (day<10 ? '0' + day : day);
		//
		this.props.putTasksRegistryHistoryPeriod({
			start: 	year + '-' + month + '-' + day,
			end: 		year + '-' + month + '-' + day
		});
		//
	},
	changePeriod() {
		this.props.putTasksRegistryHistoryPeriod({
			start: 	this.refs.periodStart.value,
			end: 		this.refs.periodEnd.value
		});
	},
	request() {
		if (this.props.getTasksRegistryHistory('getTasksRegistryHistory?sid=' + userSid) === true) {
			$(this.refs.modalFormEdit).hide('modal');
		}
	},
	refresh() {
		this.props.getTasksRegistryHistory('getTasksRegistryHistory?sid=' + userSid)
	},
	openModalEdit() {
		$(this.refs.modalFormEdit).show();
		$(this.refs.modalFormEdit).modal({backdrop: false, keyboard: true});
	},
	btnRefreshDisplay() {
		return (
			this.props.record.start !== '' && this.props.record.end !== '' ? 
				{display:''}
			: 
				{display:'none'}
		)
	},
	render: function() {
		const styleBtnPeriod 	= {
			cursor:'pointer',
			fontWeight:700,
			fontSize:'16px'
		};
		const styleBtnRefresh = {
			cursor:'pointer',
			fontWeight:700,
			fontSize:'16px',
			color:'#828282'
		};
		const styleBlock = {
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'15px 15px 15px 15px',
			marginBottom: '3px'
		}
		const styleFieldLabel = {
			textAlign: 'center',
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px'
		}
		return (
			<div className="form-control">
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-md-2"></div>
					<div className="col-md-3">
						<a style={styleBtnPeriod} onClick={() => this.selectPeriod()}>
							{this.props.periodLabel}
						</a>
					</div>
					<div className="col-md-3">
					</div>
					<div className="col-md-2">
						<a style={{...styleBtnRefresh, ...this.btnRefreshDisplay()}} 
								onClick={() => this.refresh()}>
							<b>ОБНОВИТЬ</b>
						</a>
					</div>
				</div>
				<div ref="modalFormEdit" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div className="row">
									<div className="col-md-8 col-md-offset-2">
										<Button color="warning" 
												style={{...{color:'black'}, ...this.btnRefreshDisplay()}} data-dismiss="modal"
												className="form-control" onClick={() => this.request()}>
											<b>{'OK'}</b>
										</Button>
									</div>
								</div>
							</div>
							<div className="modal-body">
								<div className="row">
									<div className="col-md-8 col-md-offset-2" style={styleBlock}>
										<div className="row">
											<div className="col-md-4">
												<h4 style={styleFieldLabel}>{'С'}</h4>
											</div>
											<div className="col-md-8">
												<input ref="periodStart" type="date" 
													value={this.props.record.start !== '' ? this.props.record.start : ''} 
													onChange={() => this.changePeriod()}
													className="form-control" style={styleFieldInput} />
											</div>
										</div>
										<div className="row">
											<div className="col-md-4">
												<h4 style={styleFieldLabel}>{'ПО'}</h4>
											</div>
											<div className="col-md-8">
												<input ref="periodEnd" type="date" 
													value={this.props.record.end !== '' ? this.props.record.end : ''} 
													onChange={() => this.changePeriod()}
													className="form-control" style={styleFieldInput} />
											</div>
										</div>
										<Button color="default" className="form-control" 
												onClick={() => this.setPeriodWorkDay()}>
											<b>{'ТЕКУЩАЯ СМЕНА'}</b>
										</Button>
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
	record:						state.tasksRegistryHistoryPeriod,
	workDay:					state.workDay,
	periodLabel:			state.tasksRegistryHistoryPeriodLabel
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksRegistryHistoryPeriod: (value) 	=> dispatch(putTasksRegistryHistoryPeriod(value)),
  getTasksRegistryHistory: (value) 				=> dispatch(getTasksRegistryHistory(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksFuncPanelHistory);
