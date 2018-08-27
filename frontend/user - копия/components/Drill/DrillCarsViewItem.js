import React from 'react'
import { connect } from 'react-redux'

import { appIsLoading } 									from '../../actions/main';
import { compileDrillCarsBlockView,
				 genDrillCarsBlockEditStaffBusy,
				 putDrillCarsEditItemToSaveEmpty,
				 saveDrillCars} 									from '../../actions/drill';
import { putUserForm } 										from '../../actions/hotkeys';

import DrillCarsEdit from './DrillCarsEdit';
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const Me = createReactClass({
	getInitialState () {
    return {
      isModalOpen: false
    };
  },
	selectItem() {
		this.props.genDrillCarsBlockEditStaffBusy();
		this.openModal();
	},
	saveItem() {
		if (this.itemCheck() === true) {
			this.props.saveDrillCars('saveDrillCars?sid=' + userSid, this.props.type); //'&type=' + this.props.type);
			this.props.putDrillCarsEditItemToSaveEmpty();
			$(this.refs.modalForm).hide('modal');
			this.props.putUserForm('drill');
		}
	},
	restoreItem() {
		this.props.compileDrillCarsBlockView();
		this.props.putDrillCarsEditItemToSaveEmpty();
		this.props.putUserForm('drill');
	},
	itemCheck() {
		var carsToSave = this.props.drillCarsEditItemsToSave;
		for (var i=0; i < carsToSave.length; i++) {
			if (carsToSave[i].state === 'base' 
					&& (carsToSave[i].OST < 1)) {
				return false
			}
			if (carsToSave[i].state === 'transfer' 
					&& (carsToSave[i].stationId === undefined || carsToSave[i].stationId === '')) {
				return false
			}
			if (carsToSave[i].state === 'transfer' 
					&& (carsToSave[i].stationId === this.props.ownStation.id)) {
				return false
			}
		}
		return true;
	},
	openModal() {
		if (this.state.isModalOpen) {
			this.setState({isModalOpen:false});
			return;
		}
		this.setState({isModalOpen:true});
		this.props.putUserForm('drillCars');
		$(this.refs.modalForm).show();
		$(this.refs.modalForm).modal({backdrop: false, keyboard: false});
	},
	mouseHover(ref,color) {
		this.refs[ref].style.backgroundColor = color;
	},
	getRowColor(item) {
		if (item.state === 'task') {
			if (item.duty === this.props.dutyNumber) {
				return {color:'blue'}
			} else {
				return {color:'red'}
			}
		} else {
			return {color:'green'}
		}
	},
	getRowState(item) {
		switch (item.state) {
			case 'base': return 'база'
			case 'task': return 'выезд'
		}
		return '';
	},
	styleMainDisplay() {
		if (this.props.data.readyList.length > 0) {
			return {display:''}
		} else {
			return {display:'none'}
		}
	},
	getSaveFlagColor() {
		var color = '#ebcccc';
		if (this.props.saveFlags) {
			if (this.props.saveFlags.cars) {
				if (this.props.saveFlags.cars[this.props.type]) {
					color = 'white';
				}
			}
		}
		return color;
	},
	render: function() {
		
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px',cursor:'pointer'}
		const styleLabel = {fontSize:'16px',fontWeight:700,display:'block',textAlign:'center',color:'#828282'}
		const styleTable = {fontSize:'16px',marginBottom:'0px'}
		
		const styleHeader = {display:'block	',textAlign:'center',fontWeight:700,color:'#828282'}
		const styleString = {display:'block	',textAlign:'center',fontWeight:700}
		const styleFooter = {display:'block	',textAlign:'center',fontWeight:700,fontSize:'18px'}
		
		const styleRowMain_1 = {width:'15%',padding:'0px'}
		const styleRowMain_2 = {width:'15%',padding:'0px'}
		const styleRowMain_3 = {width:'40%',padding:'0px'}
		const styleRowMain_4 = {width:'15%',padding:'0px'}
		const styleRowMain_5 = {width:'15%',padding:'0px'}
		
		const styleRowFooter_1 = {width:'30%',padding:'0px'}
		const styleRowFooter_2 = {width:'40%',padding:'0px'}
		const styleRowFooter_3 = {width:'15%',padding:'0px'}
		const styleRowFooter_4 = {width:'15%',padding:'0px'}

		const styleRowExt_1 = {width:'25%',padding:'0px'}
		const styleRowExt_2 = {width:'25%',padding:'0px'}
		const styleRowExt_3 = {width:'25%',padding:'0px'}
		const styleRowExt_4 = {width:'25%',padding:'0px'}
		
		if (!this.props.data.notEmpty) {
			return <div></div>
		}
		return (
			<div ref="block" onClick={() => this.selectItem()}
				style={{...styleBlock, ...{backgroundColor:this.getSaveFlagColor()}}} 			
				onMouseEnter={() => this.mouseHover('block','#d9edf7')}
				onMouseLeave={() => this.mouseHover('block',this.getSaveFlagColor())}>
				<span style={styleLabel}>{this.props.name}</span>
				<table className="table" style={{...styleTable, ...this.styleMainDisplay()}}>
					<tbody>
						<tr key="header">
							<td style={styleRowMain_1}><span style={styleHeader}>СТАТУС</span></td>
							<td style={styleRowMain_2}><span style={styleHeader}>Б/Н</span></td>
							<td style={styleRowMain_3}><span style={styleHeader}>ТИП</span></td>
							<td style={styleRowMain_4}><span style={styleHeader}>ГДЗ</span></td>
							<td style={styleRowMain_5}><span style={styleHeader}>ОСТ</span></td>
						</tr>
						{this.props.data.readyList.map((item, index) => (
							<tr key={index + item.bortNomer} 
								style={this.getRowColor(item)}>
								<td style={styleRowMain_1}><span style={styleString}>{this.getRowState(item)}</span></td>
								<td style={styleRowMain_2}><span style={styleString}>{item.bortNomer}</span></td>
								<td style={styleRowMain_3}><span style={styleString}>{item.name}</span></td>
								<td style={styleRowMain_4}><span style={styleString}>{item.GDZ}</span></td>
								<td style={styleRowMain_5}><span style={styleString}>{item.OST}</span></td>
							</tr>
						))}
					</tbody>
				</table>
				<table className="table" style={{...styleTable, ...this.styleMainDisplay()}}>
					<tbody>
						<tr key="footer">
							<td style={styleRowFooter_1}><span style={styleFooter}>ИТОГО</span></td>
							<td style={styleRowFooter_2}><span style={styleFooter}>
								{this.props.data.readyTotal.number}
							</span></td>
							<td style={styleRowFooter_3}><span style={styleFooter}>
								{this.props.data.readyTotal.GDZ}
							</span></td>
							<td style={styleRowFooter_4}><span style={styleFooter}>
								{this.props.data.readyTotal.OST}
							</span></td>
						</tr>
					</tbody>
				</table>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleRowExt_1}><span style={styleHeader}>РЕЗЕРВ</span></td>
							<td style={styleRowExt_1}><span style={styleHeader}>РЕМОНТ</span></td>
							<td style={styleRowExt_1}><span style={styleHeader}>ТО</span></td>
							<td style={styleRowExt_1}><span style={styleHeader}>ПЕРЕБРОСКА</span></td>
						</tr>
						<tr>
							<td style={styleRowExt_1}><span style={styleString}>
								{this.props.data.reserve}
							</span></td>
							<td style={styleRowExt_1}><span style={styleString}>
								{this.props.data.repair}
							</span></td>
							<td style={styleRowExt_1}><span style={styleString}>
								{this.props.data.TO}
							</span></td>
							<td style={styleRowExt_1}><span style={styleString}>
								{this.props.data.transfered}
							</span></td>
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
								<DrillCarsEdit name={this.props.name} type={this.props.type}/>
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
	ownStation:								state.drillStationCurrent,
	drillCarsEditItemsToSave: state.drillCarsEditItemsToSave,
	dutyNumber: 							state.dutyNumber,
	saveFlags:								state.drillSaveFlagsCurrentSet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 								=> dispatch(putUserForm(item)),
	appIsLoading: (bool) 								=> dispatch(appIsLoading(bool)),
	compileDrillCarsBlockView: () 			=> dispatch(compileDrillCarsBlockView()),
	genDrillCarsBlockEditStaffBusy: () 	=> dispatch(genDrillCarsBlockEditStaffBusy()),
	putDrillCarsEditItemToSaveEmpty: () => dispatch(putDrillCarsEditItemToSaveEmpty()),
	saveDrillCars: (url, type) 					=> dispatch(saveDrillCars(url, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
