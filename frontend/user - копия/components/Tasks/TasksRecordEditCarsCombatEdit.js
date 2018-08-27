import React from 'react'
import { connect } from 'react-redux'
import { refreshTasksFormEditCarsCombatItem } from '../../actions/tasksEditCars'
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const TasksRecordEditCarsCombatEdit = createReactClass({
	putMe() {
		let item = {
			time1: this.refs.time1.value,
			time2: this.refs.time2.value,
			time3: this.refs.time3.value,
			time4: this.refs.time4.value
		}
		this.props.refreshRecord(item)
	},
	putMeAuto(t) {
		let item = {}
		let d = new Date();
		let h = d.getHours();
		let m = d.getMinutes();
		h = (h < 10 ? '0' + h : h);
		m = (m < 10 ? '0' + m : m);
		item[t] = h + ':' + m;
		this.props.refreshRecord(item)
	},
	displayBtn(t) {
		return (
			t === '' ? {display:''} : {display:'none'}
		)
	},
	showTime(t) {
		return ( t !== '' ?  t : '--:--')
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
		const styleFieldLabel = {
			fontSize:'18px',
			color:'#828282'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px'
		}
		const styleFieldValue = {
			fontSize:'18px',
			fontWeight:700,
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 10px 3px 10px'
		}
		const styleButton = {
			fontSize:'14px',
			fontWeight:700,
		}
		return (
			<div>
				
				<table className="table">
					<thead>
						<tr>
							<th style={{...styleTableHead,...{width:'25%'}}}>{'ПЧ'}</th>
							<th style={{...styleTableHead,...{width:'10%'}}}>{'б/н'}</th>
							<th style={{...styleTableHead,...{width:'35%'}}}>{'марка'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'ГДЗ'}</th>
							<th style={{...styleTableHead,...{width:'15%'}}}>{'ОСТ'}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={styleTableRow}>{this.props.record.stationName}</td>
							<td style={styleTableRow}>{this.props.record.bortNomer}</td>
							<td style={styleTableRow}>{this.props.record.name}</td>
							<td style={styleTableRow}>{this.props.record.GDZ}</td>
							<td style={styleTableRow}>{this.props.record.OST}</td>
						</tr>
					</tbody>
				</table>
				
				{this.props.record.returned !== true ? 
					<div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ВЫЕЗД'}</span>
							</div>
							<div className="col-md-3">
								<input type="time" className="form-control" ref="time1"
									value={this.props.record.time1} style={styleFieldInput} 
									onChange={() => this.putMe()} />
							</div>
							<div className="col-md-3" style={this.displayBtn(this.props.record.time1)}>
								<Button color="default" style={styleButton} onClick={() => this.putMeAuto('time1')}>
									{'СЕЙЧАС'}
								</Button>
							</div>
						</div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ПРИБЫТИЕ'}</span>
							</div>
							<div className="col-md-3">
								<input type="time" className="form-control" ref="time2"
									value={this.props.record.time2} style={styleFieldInput} 
									onChange={() => this.putMe()} />
							</div>
							<div className="col-md-3" style={this.displayBtn(this.props.record.time2)}>
								<Button color="default" style={styleButton} onClick={() => this.putMeAuto('time2')}>
									{'СЕЙЧАС'}
								</Button>
							</div>
						</div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ВОЗВРАЩЕНИЕ'}</span>
							</div>
							<div className="col-md-3">
								<input type="time" className="form-control" ref="time3"
									value={this.props.record.time3} style={styleFieldInput} 
									onChange={() => this.putMe()} />
							</div>
							<div className="col-md-3" style={this.displayBtn(this.props.record.time3)}>
								<Button color="default" style={styleButton} onClick={() => this.putMeAuto('time3')}>
									{'СЕЙЧАС'}
								</Button>
							</div>
						</div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ПРИБЫТИЕ'}</span>
							</div>
							<div className="col-md-3">
								<input type="time" className="form-control" ref="time4"
									value={this.props.record.time4} style={styleFieldInput} 
									onChange={() => this.putMe()} />
							</div>
							<div className="col-md-3" style={this.displayBtn(this.props.record.time4)}>
								<Button color="default" style={styleButton} onClick={() => this.putMeAuto('time4')}>
									{'СЕЙЧАС'}
								</Button>
							</div>
						</div>
						
					</div>
				:
					<div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ВЫЕЗД'}</span>
							</div>
							<div className="col-md-3">
								<span style={styleFieldValue}>
									{this.showTime(this.props.record.time1)}
								</span>
							</div>
						</div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ПРИБЫТИЕ'}</span>
							</div>
							<div className="col-md-3">
								<span style={styleFieldValue}>
									{this.showTime(this.props.record.time2)}
								</span>
							</div>
						</div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ВОЗВРАЩЕНИЕ'}</span>
							</div>
							<div className="col-md-3">
								<span style={styleFieldValue}>
									{this.showTime(this.props.record.time3)}
								</span>
							</div>
						</div>
						
						<div className="row" style={{marginBottom:'5px'}}>
							<div className="col-md-4 col-md-offset-1">
								<span style={styleFieldLabel}>{'ПРИБЫТИЕ'}</span>
							</div>
							<div className="col-md-3">
								<span style={styleFieldValue}>
									{this.showTime(this.props.record.time4)}
								</span>
							</div>
						</div>
						
					</div>
				}
				
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	record: state.tasksFormEditCarsCombatItem
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshRecord: (value) => dispatch(refreshTasksFormEditCarsCombatItem(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCarsCombatEdit);
