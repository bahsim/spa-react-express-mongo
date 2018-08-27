import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
	render: function() {
		
		const styleTable = {fontSize:'16px',marginBottom:'0px'}
		
		const styleTD01 = {width:'10%',padding:'0px',textAlign:'center',fontWeight:700}
		const styleTD02 = {width:'50%',padding:'0px',fontWeight:700}
		const styleTD03 = {width:'40%',padding:'0px',textAlign:'center',fontWeight:700}
		
		return (
			<div>
				<div className="col-md-6" style={{fontSize:'16px',marginBottom:'10px'}}>
					<table className="table" style={{fontSize:'16px',marginBottom:'0px'}}>
						<tbody>
							<tr><th></th>
							<th style={{padding:'0px'}}>ПЧ</th>
							<th style={{padding:'0px'}}>ДПФ</th></tr>
							<tr>
								<td style={{padding:'0px'}}>
									Количество<br/>Л/состав<br/>ГДЗ<br/>Основ. ПМ<br/>Спец. ПМ<br/>Вспомог.ПМ
								</td>
								<td style={{padding:'0px'}}>
									<span style={{display:'block',textAlign:'center'}}>
										{this.props.drillStats.fireStationsCount.basic}<br/>
										{this.props.drillStats.personnelCount.basic}<br/>
										{this.props.drillStats.personnelGDZCount.basic}<br/>
										{this.props.drillStats.carsMain.basic}<br/>
										{this.props.drillStats.carsSpec.basic}<br/>
										{this.props.drillStats.carsExtra.basic}
									</span>
								</td>
								<td style={{padding:'0px'}}>
									<span style={{display:'block',textAlign:'center'}}>
										{this.props.drillStats.fireStationsCount.other}<br/>
										{this.props.drillStats.personnelCount.other}<br/>
										{this.props.drillStats.personnelGDZCount.other}<br/>
										{this.props.drillStats.carsMain.other}<br/>
										{this.props.drillStats.carsSpec.other}<br/>
										{this.props.drillStats.carsExtra.other}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="col-md-6" style={{fontSize:'16px',marginBottom:'10px'}}>
					<table className="table" style={{fontSize:'16px',marginBottom:'0px'}}>
						<tbody>
							<tr><th></th><th style={{padding:'0px'}}>ПЧ&nbsp;&nbsp;</th><th style={{padding:'0px'}}>ДПФ</th></tr>
							<tr>
								<td style={{padding:'0px'}}>
									<br/><b>РЕЗЕРВ</b><br/><br/>Основ. ПМ<br/>Спец. ПМ<br/>Вспомог.ПМ
								</td>
								<td style={{padding:'0px'}}>
									<span style={{display:'block',textAlign:'center'}}>
										<br/><br/><br/>
										{this.props.drillStats.reserveCarsMain.basic}<br/>
										{this.props.drillStats.reserveCarsSpec.basic}<br/>
										{this.props.drillStats.reserveCarsExtra.basic}
									</span>
								</td>
								<td style={{padding:'0px'}}>
									<span style={{display:'block',textAlign:'center'}}>
										<br/><br/><br/>
										{this.props.drillStats.reserveCarsMain.other}<br/>
										{this.props.drillStats.reserveCarsSpec.other}<br/>
										{this.props.drillStats.reserveCarsExtra.other}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	drillStats:	state.drillHistoryStats
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	//
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
