import React from 'react'
import { connect } from 'react-redux'

import { appIsLoading } 			from '../../actions/main';
import { getStationSupplySet,
				 saveDrillSupply} 		from '../../actions/drill';
import { putUserForm } 				from '../../actions/hotkeys';

import DrillSupplyEdit 	from './DrillSupplyEdit';
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const DrillSupplyView = createReactClass({
	getInitialState () {
    return {
      isModalOpen: false
    };
  },
	selectItem() {
		this.openModal();
	},
	saveItem() {
		this.props.saveMe('saveDrillSupply?sid=' + userSid);
		this.props.putUserForm('drill');
	},
	restoreItem() {
		this.props.getStationSupplySet();
		this.props.putUserForm('drill');
	},
	openModal() {
		if (this.state.isModalOpen) {
			this.setState({isModalOpen:false});
			return;
		}
		this.setState({isModalOpen:true});
		this.props.putUserForm('drillSupply');
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
		
		const styleTD01_1 = {width:'10%',padding:'0px',textAlign:'center',fontWeight:700}
		const styleTD02_1 = {width:'40%',padding:'0px',fontWeight:700}
		const styleTD03_1 = {width:'25%',padding:'0px',textAlign:'center',fontWeight:700}
		const styleTD04_1 = {width:'25%',padding:'0px',textAlign:'center',fontWeight:700}
		
		const styleTD01 = {width:'10%',padding:'0px',textAlign:'center',fontWeight:700}
		const styleTD02 = {width:'50%',padding:'0px',fontWeight:700}
		const styleTD03 = {width:'40%',padding:'0px',textAlign:'center',fontWeight:700}
		return (
			<div ref="block" onClick={() => this.selectItem()} 
				style={{...styleBlock, 
								...{backgroundColor:(!this.props.saveFlags.supply ? '#ebcccc': 'white')}}} 			
				onMouseEnter={() => this.mouseHover('block','#d9edf7')}
				onMouseLeave={() => this.mouseHover('block',(!this.props.saveFlags.supply ? '#ebcccc': 'white'))}>
				<span style={styleLabel}>ГСМ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01_1}></td>
							<td style={styleTD02_1}></td>
							<td style={{...styleTD01_1, ...{color:'#828282'}}}>бензин&nbsp;</td>
							<td style={{...styleTD01_1, ...{color:'#828282'}}}>дизель</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>в б/расчете</td>
							<td style={styleTD03_1}>{this.props.drillSupplySet.gsm.benzin.combat}</td>
							<td style={styleTD04_1}>{this.props.drillSupplySet.gsm.dizel.combat}</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>в резерве</td>
							<td style={styleTD03_1}>{this.props.drillSupplySet.gsm.benzin.reserve}</td>
							<td style={styleTD04_1}>{this.props.drillSupplySet.gsm.dizel.reserve}</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>в ремонте</td>
							<td style={styleTD03_1}>{this.props.drillSupplySet.gsm.benzin.repair}</td>
							<td style={styleTD04_1}>{this.props.drillSupplySet.gsm.dizel.repair}</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>на складе</td>
							<td style={styleTD03_1}>{this.props.drillSupplySet.gsm.benzin.store}</td>
							<td style={styleTD04_1}>{this.props.drillSupplySet.gsm.dizel.store}</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>ПЕНООБРАЗОВАТЕЛЬ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в б/расчете</td>
							<td style={styleTD03}>{this.props.drillSupplySet.pena.combat}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в резерве</td>
							<td style={styleTD03}>{this.props.drillSupplySet.pena.reserve}</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>СИЗОД</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в б/расчете</td>
							<td style={styleTD03}>{this.props.drillSupplySet.sizod.combat}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в резерве</td>
							<td style={styleTD03}>{this.props.drillSupplySet.sizod.reserve}</td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>на базе</td>
							<td style={styleTD03}>{this.props.drillSupplySet.sizod.base}</td>
						</tr>
					</tbody>
				</table>
				<div ref="modalForm" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div style={{marginLeft:'30%'}}>
									<Button color="warning" style={{color:'black'}} data-dismiss="modal"
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
								<DrillSupplyEdit/>
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
	drillSupplySet:	state.drillSupplySet,
	saveFlags:			state.drillSaveFlagsCurrentSet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  getStationSupplySet: () 				=> dispatch(getStationSupplySet()),
	saveMe: (url)										=> dispatch(saveDrillSupply(url)),
	appIsLoading: (bool)						=> dispatch(appIsLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillSupplyView);
