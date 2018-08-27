import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
	render: function() {
		
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px'}
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
			<div ref="block" style={styleBlock}>
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
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	drillSupplySet:	state.drillHistoryDataSetStation.supply
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  //
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
