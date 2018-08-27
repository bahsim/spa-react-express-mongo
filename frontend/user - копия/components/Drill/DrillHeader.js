import React from 'react'
import { getDrillReport } from '../../actions/drill';
import { connect } from 'react-redux'
import DrillStats from './DrillStats';
import createReactClass from 'create-react-class';

const DrillHeader = createReactClass({
	selectItem(item) {
		this.props.selectMenu(item);
		this.props.selectMenuFlag(true);
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
	render: function() {
		
		const hrefReport = '/getDrillReport?sid=' + userSid;
		
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
		const styleReportLabel = {
			marginTop:'10px',
			marginBottom:'10px',
			fontSize:'18px',
			fontWeight:700
		}
		return (
			<div className="row">
				<div className="col-md-6" style={{fontSize:'16px'}}>
					<div style={styleMainBlock}>
						<span style={styleStationName}>
							{this.props.drillStationCurrent.name}
						</span>
						<span>&nbsp;&nbsp;&nbsp;</span>
						{this.props.drillLastSaveCurrentSet.date === this.props.workDay ?
							<span style={styleMainBlockLabel}>
								{this.props.drillLastSaveCurrentSet.dispatcherName}
							</span>
						: ''
						}
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
						<div className="col-md-8">
							<div style={styleMainLabel}>
								{'СТРОЕВАЯ ЗАПИСКА'}
							</div>
							<span style={styleMainSubLabel}>
								{'смена '}
							</span>
							<span style={styleLabelValue}>
								{'№ ' + this.props.dutyNumber}
							</span>
							<span style={styleMainSubLabel}>
								{' от '}
							</span>
							<span style={styleLabelValue}>
								{new Date(this.props.workDay).toLocaleDateString()}
							</span>
						</div>
						<div className="col-md-4" style={styleReportLabel}>
							<a href={hrefReport}>{'ОТЧЕТ'}</a>
						</div>
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
	workDay: 									state.workDay,
	dutyNumber: 							state.dutyNumber,
  drillStationCurrent: 			state.drillStationCurrent,
	drillLastSaveCurrentSet: 	state.drillLastSaveCurrentSet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	getDrillReport: (url) => dispatch(getDrillReport(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillHeader);
