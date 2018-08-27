import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
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
	render: function() {
		
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px'}
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
			<div ref="block" style={styleBlock}>
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
							<tr key={index + item.bortNomer}>
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
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	drillCarsEditItemsToSave: state.drillCarsEditItemsToSave
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	//
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
