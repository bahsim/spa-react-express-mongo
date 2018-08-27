import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
	render: function() {
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px'}
		const styleLabel = {fontSize:'16px',fontWeight:700,display:'block',textAlign:'center',color:'#828282'}
		const styleTable = {fontSize:'16px',marginBottom:'0px'}
		const styleTD01 = {width:'10%',padding:'0px',textAlign:'center',fontWeight:700}
		const styleTD02 = {width:'72%',padding:'0px',fontWeight:700}
		const styleTD03 = {width:'18%',padding:'0px',textAlign:'center',fontWeight:700}
		return (
			<div ref="block" style={styleBlock}>
				<span style={styleLabel}>ЛИЧНЫЙ СОСТАВ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>по штату</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.total}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в отпуске</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.vacation}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>по болезни</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.illness}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в командировке</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.missionOut}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>прикомандированы</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.missionIn}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>другие причины</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.otherOut}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>вакантные места</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.vacant}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>налицо</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.present}</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>НЕ В БОЕВОМ РАСЧЕТЕ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>диспетчер</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.dispatchers}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в наряде</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.onDuty}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>не подготовлены</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.notPrepared}</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>В БОЕВОМ РАСЧЕТЕ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>всего</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.combatTotal}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>газодымзащита</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.combatGDZ}</td>
						</tr>
						<tr>
							<td style={styleTD01}></td>
							<td style={styleTD02}>назначены</td>
							<td style={styleTD03}>{this.props.drillDutyCarsCurrentItem.combatGDZbusy}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>остальные</td>
							<td style={styleTD03}>{this.props.drillDutyCurrentItem.combatOther}</td>
						</tr>
						<tr>
							<td style={styleTD01}></td>
							<td style={styleTD02}>назначены</td>
							<td style={styleTD03}>{this.props.drillDutyCarsCurrentItem.combatOtherBusy}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	drillDutyCurrentItem:			state.drillHistoryDataSetStation.duty,
	drillDutyCarsCurrentItem:	state.drillHistoryDataSetStation.dutyCars
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	//
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
