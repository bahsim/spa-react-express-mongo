import React from 'react'
import { putDrillSupplySetEdit } from '../../actions/drill';
import { connect } from 'react-redux'
import DrillCarsEditItem from './DrillCarsEdit';
import createReactClass from 'create-react-class';

const DrillSupplyEdit = createReactClass({
	putMe(e) {
		var dutySet = {}
		dutySet.gsm = {} 
		dutySet.gsm.benzin = {}
		dutySet.gsm.dizel = {}
		dutySet.pena = {}
		dutySet.sizod = {}
		// БЕНЗИН
		dutySet.gsm.benzin.combat = 
				(this.refs.gsmBenzinCombat.value !== '' ? 
					parseInt(this.refs.gsmBenzinCombat.value)		: this.props.drillSupplySet.gsm.benzin.combat);
		dutySet.gsm.benzin.reserve = 
				(this.refs.gsmBenzinReserve.value !== '' ? 
					parseInt(this.refs.gsmBenzinReserve.value)	: this.props.drillSupplySet.gsm.benzin.reserve);
		dutySet.gsm.benzin.repair = 
				(this.refs.gsmBenzinRepair.value !== '' ? 
					parseInt(this.refs.gsmBenzinRepair.value) 	: this.props.drillSupplySet.gsm.benzin.repair);
		dutySet.gsm.benzin.store =
				(this.refs.gsmBenzinStore.value !== '' ? 
					parseInt(this.refs.gsmBenzinStore.value) 		: this.props.drillSupplySet.gsm.benzin.store);
		// ДИЗЕЛЬ
		dutySet.gsm.dizel.combat =
				(this.refs.gsmDizelCombat.value !== '' ? 
					parseInt(this.refs.gsmDizelCombat.value) 	: this.props.drillSupplySet.gsm.dizel.combat);
		dutySet.gsm.dizel.reserve = 
				(this.refs.gsmDizelReserve.value !== '' ? 
					parseInt(this.refs.gsmDizelReserve.value) : this.props.drillSupplySet.gsm.dizel.reserve);
		dutySet.gsm.dizel.repair =
				(this.refs.gsmDizelRepair.value !== '' ? 
					parseInt(this.refs.gsmDizelRepair.value) 	: this.props.drillSupplySet.gsm.dizel.repair);
		dutySet.gsm.dizel.store = 
				(this.refs.gsmDizelStore.value !== '' ? 
					parseInt(this.refs.gsmDizelStore.value) 	: this.props.drillSupplySet.gsm.dizel.store);
		// ПЕНООБРАЗОВАТЕЛЬ
		dutySet.pena.combat =
				(this.refs.penaCombat.value !== '' ? 
					parseInt(this.refs.penaCombat.value) 	: this.props.drillSupplySet.pena.combat);
		dutySet.pena.reserve = 
				(this.refs.penaReserve.value !== '' ? 
					parseInt(this.refs.penaReserve.value) : this.props.drillSupplySet.pena.reserve);
		// СИЗОД
		dutySet.sizod.combat =
				(this.refs.sizodCombat.value !== '' ? 
					parseInt(this.refs.sizodCombat.value) 	: this.props.drillSupplySet.sizod.combat);
		dutySet.sizod.reserve = 
				(this.refs.sizodReserve.value !== '' ? 
					parseInt(this.refs.sizodReserve.value)	: this.props.drillSupplySet.sizod.reserve);
		dutySet.sizod.base =
				(this.refs.sizodBase.value !== '' ? 
					parseInt(this.refs.sizodBase.value) 		: this.props.drillSupplySet.sizod.base);
		//
		this.props.putDrillSupplySetEdit(dutySet)
	},
	render: function() {
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',
												margin:'0px 120px 0px 120px',padding:'3px 3px 3px 3px'}
		const styleLabel = {fontSize:'18px',display:'block',textAlign:'center',color:'#828282'}
		const styleTable = {fontSize:'18px',marginBottom:'0px'}
		
		const styleTD01_1 = {width:'10%',padding:'0px',textAlign:'center'}
		const styleTD02_1 = {width:'40%',padding:'0px'}
		const styleTD03_1 = {width:'25%',padding:'0px',textAlign:'center'}
		const styleTD04_1 = {width:'25%',padding:'0px',textAlign:'center'}
		
		const styleTD01 = {width:'10%',padding:'0px',textAlign:'center'}
		const styleTD02 = {width:'50%',padding:'0px'}
		const styleTD03 = {width:'30%',padding:'0px',textAlign:'center'}
		const styleTD04 = {width:'10%',padding:'0px',textAlign:'center'}
		
		const styleTD03Label = {width:'25%',padding:'0px 15px 0px 0px',textAlign:'center',fontWeight:700}
		const styleInput = {padding:'0px',height:'100%',textAlign:'center',fontSize:'18px'}
		
		return (			
			<div style={styleBlock} onChange={this.putMe}>
				<span style={styleLabel}>ГСМ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01_1}></td>
							<td style={styleTD02_1}></td>
							<td style={{...styleTD03_1, ...{color:'#828282'}}}>бензин&nbsp;</td>
							<td style={{...styleTD04_1, ...{color:'#828282'}}}>дизель</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>в б/расчете</td>
							<td style={styleTD03_1}>
								<input data-ref='total' type="number" className="form-control" style={styleInput} min="0"
								ref="gsmBenzinCombat" value={this.props.drillSupplySet.gsm.benzin.combat} />
							</td>
							<td style={styleTD04_1}>
								<input data-ref='total' type="number" className="form-control" style={styleInput} min="0"
								ref="gsmDizelCombat" value={this.props.drillSupplySet.gsm.dizel.combat} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>в резерве</td>
							<td style={styleTD03_1}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="gsmBenzinReserve" value={this.props.drillSupplySet.gsm.benzin.reserve} />
							</td>
							<td style={styleTD04_1}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="gsmDizelReserve" value={this.props.drillSupplySet.gsm.dizel.reserve} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>в ремонте</td>
							<td style={styleTD03_1}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="gsmBenzinRepair" value={this.props.drillSupplySet.gsm.benzin.repair} />
							</td>
							<td style={styleTD04_1}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="gsmDizelRepair" value={this.props.drillSupplySet.gsm.dizel.repair} />
							</td>
						</tr>
						<tr>
							<td style={styleTD01_1}>-</td>
							<td style={styleTD02_1}>на складе</td>
							<td style={styleTD03_1}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="gsmBenzinStore" value={this.props.drillSupplySet.gsm.benzin.store} />
							</td>
							<td style={styleTD04_1}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="gsmDizelStore" value={this.props.drillSupplySet.gsm.dizel.store} />
							</td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>ПЕНООБРАЗОВАТЕЛЬ</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в б/расчете</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="penaCombat" value={this.props.drillSupplySet.pena.combat} />
							</td>
							<td style={styleTD04}></td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в резерве</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="penaReserve" value={this.props.drillSupplySet.pena.reserve} />
							</td>
							<td style={styleTD04}></td>
						</tr>
					</tbody>
				</table>
				<span style={styleLabel}>СИЗОД</span>
				<table className="table" style={styleTable}>
					<tbody>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в б/расчете</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="sizodCombat" value={this.props.drillSupplySet.sizod.combat} />
							</td>
							<td style={styleTD04}></td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>в резерве</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="sizodReserve" value={this.props.drillSupplySet.sizod.reserve} />
							</td>
							<td style={styleTD04}></td>
						</tr>
						<tr>
							<td style={styleTD01}>-</td>
							<td style={styleTD02}>на базе</td>
							<td style={styleTD03}>
								<input type="number" className="form-control" style={styleInput} min="0"
								ref="sizodBase" value={this.props.drillSupplySet.sizod.base} />
							</td>
							<td style={styleTD04}></td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	drillSupplySet:						state.drillSupplySet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putDrillSupplySetEdit: (item) => dispatch(putDrillSupplySetEdit(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillSupplyEdit);
