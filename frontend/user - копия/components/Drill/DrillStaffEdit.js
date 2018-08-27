import React from 'react'
import { putDrillDutyCurrentItem } from '../../actions/drill';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const DrillStaffEdit = createReactClass({
	putMe(e) {
		const { 
			total, vacation, illness, missionOut, missionIn, otherOut, vacant,
			onDuty, dispatchers, notPrepared, combatGDZ
		} = this.refs;
		var dutySet = {
			total: 				(total.value !== '' 			? parseInt(total.value) 			: this.drillDutyCurrentItem.total),
			vacation: 		(vacation.value !== '' 		? parseInt(vacation.value)	 	: this.drillDutyCurrentItem.vacation),
			illness: 			(illness.value !== '' 		? parseInt(illness.value) 		: this.drillDutyCurrentItem.illness),
			missionOut: 	(missionOut.value !== '' 	? parseInt(missionOut.value)	: this.drillDutyCurrentItem.missionOut),
			missionIn: 		(missionIn.value !== '' 	? parseInt(missionIn.value) 	: this.drillDutyCurrentItem.missionIn),
			otherOut: 		(otherOut.value !== '' 		? parseInt(otherOut.value) 		: this.drillDutyCurrentItem.otherOut),
			vacant: 			(vacant.value !== '' 			? parseInt(vacant.value) 			: this.drillDutyCurrentItem.vacant),
			present: 			0, 
			onDuty: 			(onDuty.value !== '' 			? parseInt(onDuty.value) 			: this.drillDutyCurrentItem.onDuty),
			dispatchers: 	(dispatchers.value !== '' ? parseInt(dispatchers.value)	: this.drillDutyCurrentItem.dispatchers),
			notPrepared:	(notPrepared.value !== '' ? parseInt(notPrepared.value)	: this.drillDutyCurrentItem.notPrepared),
			combatTotal: 	0, 
			combatGDZ:		(combatGDZ.value !== '' 	? parseInt(combatGDZ.value)		: this.drillDutyCurrentItem.combatGDZ),
			combatOther: 	0
		}
		dutySet.present = parseInt(dutySet.total - dutySet.vacation - dutySet.illness - dutySet.missionOut
										+ dutySet.missionIn - dutySet.otherOut - dutySet.vacant);
		dutySet.combatTotal = dutySet.present - dutySet.onDuty 
												- dutySet.dispatchers - dutySet.notPrepared;
		dutySet.combatOther = dutySet.combatTotal - dutySet.combatGDZ;
		this.props.putDrillDutyCurrentItem(dutySet)
	},
	render: function() {
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',
												margin:'0px 120px 0px 120px',padding:'3px 3px 3px 3px'}
		const styleLabel = {fontSize:'18px',display:'block',textAlign:'center',color:'#828282'}
		const styleTable = {fontSize:'18px',marginBottom:'0px'}
		const styleTD01 = {width:'10%',padding:'0px',textAlign:'center'}
		const styleTD02 = {width:'65%',padding:'0px'}
		const styleTD03 = {width:'25%',padding:'0px',textAlign:'center'}
		const styleTD03Label = {width:'25%',padding:'0px 15px 0px 0px',textAlign:'center',fontWeight:700}
		const styleInput = {padding:'0px',height:'100%',textAlign:'center',fontSize:'18px'}
		return (			
			<div style={styleBlock} onChange={this.putMe}>
				<span style={styleLabel}>ЛИЧНЫЙ СОСТАВ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>по штату</td>
							<td style={styleTD03}>
								<input data-ref='total' type="number" className="form-control" style={styleInput} min="0"
								ref="total" value={this.props.drillDutyCurrentItem.total} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в отпуске</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="vacation" value={this.props.drillDutyCurrentItem.vacation} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>по болезни</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="illness" value={this.props.drillDutyCurrentItem.illness} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в командировке</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="missionOut" value={this.props.drillDutyCurrentItem.missionOut} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>прикомандированы</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="missionIn" value={this.props.drillDutyCurrentItem.missionIn} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>другие причины</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="otherOut" value={this.props.drillDutyCurrentItem.otherOut} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>вакантные места</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="vacant" value={this.props.drillDutyCurrentItem.vacant} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>налицо</td>
							<td style={styleTD03Label}>{this.props.drillDutyCurrentItem.present}</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>НЕ В БОЕВОМ РАСЧЕТЕ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>диспетчер</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="dispatchers" value={this.props.drillDutyCurrentItem.dispatchers} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в наряде</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="onDuty" value={this.props.drillDutyCurrentItem.onDuty} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>не подготовлены</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="notPrepared" value={this.props.drillDutyCurrentItem.notPrepared} />
							</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>В БОЕВОМ РАСЧЕТЕ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>всего</td>
							<td style={styleTD03Label}>{this.props.drillDutyCurrentItem.combatTotal}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>газодымзащита</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="combatGDZ" value={this.props.drillDutyCurrentItem.combatGDZ} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01}></td>
							<td style={styleTD02}>назначены</td>
							<td style={styleTD03Label}>{this.props.drillDutyCarsCurrentItem.combatGDZbusy}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>остальные</td>
							<td style={styleTD03Label}>{this.props.drillDutyCurrentItem.combatOther}</td>
						</tr>
						<tr>
							<td style={styleTD01}></td>
							<td style={styleTD02}>назначены</td>
							<td style={styleTD03Label}>{this.props.drillDutyCarsCurrentItem.combatOtherBusy}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	workDay: 									state.workDay,
	dutyNumber: 							state.dutyNumber,
  drillStationCurrent: 			state.drillStationCurrent,
	drillDutyCurrentItem:			state.drillDutyCurrentItem,
	drillDutyCarsCurrentItem:	state.drillDutyCarsCurrentItem
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putDrillDutyCurrentItem: (item) => dispatch(putDrillDutyCurrentItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillStaffEdit);
