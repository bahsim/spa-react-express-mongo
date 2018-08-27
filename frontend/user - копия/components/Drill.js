import React from 'react'
import { connect } from 'react-redux'

import { putAppMode } 	from '../actions/main';
import { putUserForm } 	from '../actions/hotkeys';

import DrillStations 			from './Drill/DrillStations';
import DrillHeader 				from './Drill/DrillHeader';
import DrillStaffView 		from './Drill/DrillStaffView';
import DrillCarsView 			from './Drill/DrillCarsView';
import DrillSupplyView 		from './Drill/DrillSupplyView';
import DrillMainStaffView from './Drill/DrillMainStaffView';
import createReactClass 	from 'create-react-class';

var Drill = createReactClass({
	
	displayMe() {
		return this.props.stationFlag === true ? {display:''} : {display:'none'}
	},
	
	gotoBack() {
		this.props.putUserForm('main');
		this.props.gotoBack('main');
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
					<div style={this.displayMe()}>
						<DrillHeader/>
						<div className="row">
							<div className="col-md-3">
								<div className="row">
									<DrillStaffView/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="row">
									<DrillCarsView/>
								</div>
							</div>
							<div className="col-md-3">
								<div className="row">
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
	stationFlag: state.drillStationCurrentFlag
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) => dispatch(putUserForm(item)),
  gotoBack: (item) 		=> dispatch(putAppMode(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Drill);
