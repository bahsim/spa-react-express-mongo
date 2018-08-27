import React from 'react'

import { connect } from 'react-redux'
import DrillStaffEdit from './DrillStaffEdit';
import createReactClass from 'create-react-class';

import { appIsLoading } from '../../actions/main';
import { putDrillDutyCurrentItem,
				 getStationDutyItem,
				 saveDuty} from '../../actions/drill';
import { putUserForm } 	from '../../actions/hotkeys';

import { Button } from 'reactstrap';

const DrillStaffView = createReactClass({
	getInitialState () {
    return {
      isModalOpen: false
    };
  },
	selectItem() {
		this.openModal();
	},
	saveItem() {
		if (this.itemCheck() === true) {
			this.props.saveDuty('saveDrillDuty?sid=' + userSid);
			this.props.putUserForm('drill');
			$(this.refs.modalForm).hide('modal');
		}
	},
	restoreItem() {
		this.props.putUserForm('drill');
		this.props.getStationDutyItem(this.props.dutyNumber);
	},
	itemCheck(item) {
		var dutySetCars = this.props.drillDutyCarsCurrentItem;
		var dutySet = {
			total: 				this.props.drillDutyCurrentItem.total,
			vacation: 		this.props.drillDutyCurrentItem.vacation,
			illness: 			this.props.drillDutyCurrentItem.illness,
			missionOut: 	this.props.drillDutyCurrentItem.missionOut,
			missionIn: 		this.props.drillDutyCurrentItem.missionIn,
			otherOut: 		this.props.drillDutyCurrentItem.otherOut,
			vacant: 			this.props.drillDutyCurrentItem.vacant,
			present: 			this.props.drillDutyCurrentItem.present, 
			onDuty: 			this.props.drillDutyCurrentItem.onDuty,
			dispatchers: 	this.props.drillDutyCurrentItem.dispatchers,
			notPrepared:	this.props.drillDutyCurrentItem.notPrepared,
			combatTotal: 	this.props.drillDutyCurrentItem.combatTotal, 
			combatGDZ:		this.props.drillDutyCurrentItem.combatGDZ,
			combatOther: 	this.props.drillDutyCurrentItem.combatOther
		}
		dutySet.present = parseInt(dutySet.total - dutySet.vacation - dutySet.illness - dutySet.missionOut
										+ dutySet.missionIn - dutySet.otherOut - dutySet.vacant);
		dutySet.combatTotal = dutySet.present - dutySet.onDuty 
												- dutySet.dispatchers - dutySet.notPrepared;
		dutySet.combatOther = dutySet.combatTotal - dutySet.combatGDZ;
		this.props.putDrillDutyCurrentItem(dutySet);
		if (dutySet.present < 0) {return false}
		if (dutySet.combatTotal < 0) {return false}
		if (dutySet.combatOther < 0) {return false}
		if (dutySet.combatGDZ < dutySetCars.combatGDZbusy) {return false}
		if (dutySet.combatOther < dutySetCars.combatOtherBusy) {return false}
		if (dutySet.combatTotal < (dutySet.combatGDZ + dutySet.combatOther)) {return false}
		return true;
	},
	openModal() {
		if (this.state.isModalOpen) {
			this.setState({isModalOpen:false});
			return;
		}
		this.setState({isModalOpen:true});
		this.props.putUserForm('drillDuty');
		$(this.refs.modalForm).show();
		$(this.refs.modalForm).modal({backdrop: false, keyboard: false});
	},
	mouseHover(ref,color) {
		this.refs[ref].style.backgroundColor = color;
	},
	render: function() {
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px',cursor:'pointer'}
		const styleLabel = {fontSize:'16px',fontWeight:700,display:'block',textAlign:'center',color:'#828282'}
		const styleTable = {fontSize:'16px',marginBottom:'0px'}
		const styleTD01 = {width:'10%',padding:'0px',textAlign:'center',fontWeight:700}
		const styleTD02 = {width:'72%',padding:'0px',fontWeight:700}
		const styleTD03 = {width:'18%',padding:'0px',textAlign:'center',fontWeight:700}
		return (
			<div ref="block" onClick={() => this.selectItem()} 
				style={{...styleBlock, 
								...{backgroundColor:(!this.props.saveFlags.staff ? '#ebcccc': 'white')}}} 			
				onMouseEnter={() => this.mouseHover('block','#d9edf7')}
				onMouseLeave={() => this.mouseHover('block',(!this.props.saveFlags.staff ? '#ebcccc': 'white'))}>
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
				<div ref="modalForm" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div style={{marginLeft:'30%'}}>
									<Button color="warning" style={{color:'black'}}
										onClick={() => this.saveItem()}>
										<b>СОХРАНИТЬ</b>
									</Button>
									<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
										onClick={() => this.restoreItem()}>
										<b>ЗАКРЫТЬ</b>
									</Button>
								</div>
							</div>
							<div className="modal-body">
								<DrillStaffEdit/>
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
	workDay: 									state.workDay,
	dutyNumber: 							state.dutyNumber,
  drillStationCurrent: 			state.drillStationCurrent,
	drillDutyCurrentItem:			state.drillDutyCurrentItem,
	drillDutyCarsCurrentItem:	state.drillDutyCarsCurrentItem,
	saveFlags:		state.drillSaveFlagsCurrentSet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  putDrillDutyCurrentItem: (item) => dispatch(putDrillDutyCurrentItem(item)),
  getStationDutyItem: (item) 			=> dispatch(getStationDutyItem(item)),
	saveDuty: (url)									=> dispatch(saveDuty(url)),
	appIsLoading: (bool)						=> dispatch(appIsLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillStaffView);
