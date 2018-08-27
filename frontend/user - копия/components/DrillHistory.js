import React from 'react'
import { connect } from 'react-redux'

import { putAppMode } 	from '../actions/main';
import { putUserForm } 	from '../actions/hotkeys';
import { clearDrillHistoryData } from '../actions/drillHistory';

import DrillStations 			from './DrillHistory/DrillHistoryStations';
import DrillHeader 				from './DrillHistory/DrillHistoryHeader';
import DrillStaffView 		from './DrillHistory/DrillHistoryStaffView';
import DrillCarsView 			from './DrillHistory/DrillHistoryCarsView';
import DrillSupplyView 		from './DrillHistory/DrillHistorySupplyView';
import DrillMainStaffView from './DrillHistory/DrillHistoryMainStaffView';
import createReactClass 	from 'create-react-class';

var DrillHistory = createReactClass({
	displayMe() {
		return this.props.stationFlag === true ? {display:''} : {display:'none'}
	},
	gotoBack() {
		this.props.putUserForm('main');
		this.props.gotoBack('main');
		this.props.clearDrillHistoryData();
	},
	render: function() {
		
		const styleTD1 = {width:'25%'}
		const styleTD2 = {width:'50%'}
		const styleTD3 = {width:'25%'}
		
		const styleLogo = {
			display:'block',
			marginLeft:'auto',
			marginRight:'auto'
		};
		
		const styleBtnBack = {
			display:'block',
			textAlign:'center',
			fontSize:'18px',
			fontWeight:700,
			cursor:'pointer'
		}
		
		return (
			<div>
				<div className="col-md-2">
					<img src="/logo2.png" style={styleLogo} width="47" height="41" alt="" />
					<img src="/logo3.png" style={styleLogo} width="171" height="33" alt="" />
					<br/>
					<a title="ESC"><span style={styleBtnBack} onClick={() => this.gotoBack()}>
						{'<< НАЗАД'}
					</span></a>
					<br/>
					<DrillStations/>
				</div>
				<div className="col-md-10">
					<div ref="workSpace">
						<DrillHeader/>
						<div className="row">
							<div className="col-md-3">
								<div className="row" style={this.displayMe()}>
									<DrillStaffView/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="row" style={this.displayMe()}>
									<DrillCarsView/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="row" style={this.displayMe()}>
									<DrillSupplyView/>
									<DrillMainStaffView/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	stationFlag: state.drillHistoryStationFlag
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 					=> dispatch(putUserForm(item)),
  gotoBack: (item) 							=> dispatch(putAppMode(item)),
  clearDrillHistoryData: (item) => dispatch(clearDrillHistoryData(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillHistory);
