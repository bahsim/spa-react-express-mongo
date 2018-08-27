import React from 'react'
import {putDrillHistoryDutyWorkDay, 
				selectDrillHistoryDate,
				drillHistoryRefreshData} from '../../actions/drillHistory';
import { connect } from 'react-redux'
import DrillStats from './DrillHistoryStats';
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const Me = createReactClass({
	changeDate() {
		this.props.putDrillHistoryDutyWorkDay(this.refs.date.value);
		this.props.selectDrillHistoryDate();
	},
	refreshData() {
		if (this.props.workDay === '') {
			return
		}
		let url = 'getDrillHistoryDaySet?sid=' + userSid + '&date=' + this.props.workDay;
		this.props.drillHistoryRefreshData(url);
	},
	stationAdress() {
		if (this.props.drillStationCurrent.region === undefined) {
			return ''
		}
		var value = this.props.drillStationCurrent;
		var adress = value.region; 
		if (value.naselPunkt && adress) {adress += ', '}
		adress += value.naselPunkt;
		if (value.adress && adress) {adress += ', '}
		adress += value.adress;
		return adress;
	},
	setDate(value) {
		if (value === undefined) {
			return ''
		}
		let arr1 = value.split('-');
		let year = parseInt(arr1[0]);
		let month = parseInt(arr1[1]);
		let day = parseInt(arr1[2]);
		if (isNaN(arr1[0]) ||isNaN(arr1[1]) ||isNaN(arr1[2])) {
			return ''
		}
		month = (month<10 ? '0' + month : month)
		day = (day<10 ? '0' + day : day)
		return (
			year + '-' + month + '-' + day
		)
	},
	displayMe() {
		return this.props.stationFlag === true ? {display:''} : {display:'none'}
	},
	render: function() {
		
		const hrefReport = '/getDrillHistoryReport?sid=' + userSid + '&date=' + this.props.workDay;
		
		const styleMainBlock = {
			border:'1px solid grey',
			borderRadius:'5px',
			paddingLeft:'5px',
			paddingRight:'5px'
		}
		const styleStationName = {
			fontSize:'20px',
			color:'#828282',
			fontWeight:700
		}
		const styleMainBlockLabel = {
			fontSize:'16px',
			fontWeight:700
		}
		const styleMainLabel = {
			marginTop:'10px',
			marginBottom:'10px',
			fontSize:'20px',
			fontWeight:700,
			color:'#f0ad4e'
		}
		const styleMainSubLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleLabelValue = {
			fontSize:'18px',
			fontWeight:700,
			color:'#f0ad4e',
			border:'1px solid grey',
			borderRadius:'5px',
			padding:'5px 10px 5px 10px'
		}
		const styleDateInput = {
			fontSize:'18px',
			fontWeight:700,
			color:'#f0ad4e',
			border:'1px solid grey',
			borderRadius:'5px',
			padding:'5px 0px 5px 5px'
		}
		const styleReportLabel = {
			marginTop:'10px',
			marginBottom:'10px',
			fontSize:'18px',
			fontWeight:700,
			cursor:'pointer'
		}
		return (
			<div className="row">
				<div className="col-md-6">
					<div style={styleMainBlock}>
						<span style={styleStationName}>
							{this.props.drillStationCurrent.name}
						</span>
						<span>&nbsp;&nbsp;&nbsp;</span>
						<span style={styleMainBlockLabel}>
							{this.props.dispatcherName}
						</span>
						<br/>
						<span style={styleMainBlockLabel}>
							{this.stationAdress()}
						</span>
						<br/>
						<span style={styleMainBlockLabel}>
							{this.props.drillStationCurrent.telephones}
						</span>
					</div>
					<div className="row">
						<div className="col-md-8" style={styleMainLabel}>
							{'СТРОЕВАЯ ЗАПИСКА'}
						</div>
						<div className="col-md-4" style={{...this.displayMe(),...styleReportLabel}}>
							<a href={hrefReport}>{'ОТЧЕТ'}</a>
						</div>
					</div>
					<div className="row">
						<div className="col-md-9">
							<span style={styleMainSubLabel}>
								{'смена '}
							</span>
							<span style={styleLabelValue}>
								{'№ ' + this.props.dutyNumber}
							</span>
							<span style={styleMainSubLabel}>
								{' от '}
							</span>
							<input type="date" ref='date' value={this.setDate(this.props.workDay)}
								style={styleDateInput} onChange={() => this.changeDate()} />
						</div>
						<div className="col-md-2">
							<Button color="default" onClick={() => this.refreshData()}>
								<b>ОБНОВИТЬ</b>
							</Button>
						</div>
						<br/><br/><br/><br/>
					</div>
				</div>
				<div className="col-md-6">
					<DrillStats/>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	workDay: 							state.drillHistoryDutyWorkDay,
	dutyNumber: 					state.drillHistoryDutyNumber,
  drillStationCurrent: 	state.drillHistoryStation,
	dispatcherName: 			state.drillHistoryDataSetStation.dispatcherName,
	stationFlag: 					state.drillHistoryStationFlag
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	putDrillHistoryDutyWorkDay: (value) => dispatch(putDrillHistoryDutyWorkDay(value)),
	selectDrillHistoryDate: () 					=> dispatch(selectDrillHistoryDate()),
	drillHistoryRefreshData:(url)				=> dispatch(drillHistoryRefreshData(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
