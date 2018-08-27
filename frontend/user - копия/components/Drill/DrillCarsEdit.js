import React from 'react'
import { connect } from 'react-redux'
import DrillCarsEditItem from './DrillCarsEditItem';
import createReactClass from 'create-react-class';

const Me = createReactClass({
	render: function() {
		const styleBlock = {
			borderTop:'1px solid #C0C0C0',
			borderRadius:'15px', 
			fontSize:'16px',
			margin:'5px 0px 0px 0px',
			padding:'5px 3px 5px 3px'
		}
		const styleHeader = {
			display:'block',
			textAlign:'center',
			fontWeight:700,
			color:'#828282'
		}
		const styleLabel = {
			fontSize:'18px',
			display:'block',
			textAlign:'center',
			color:'#828282'
		}
		const styleString = {
			display:'block',
			textAlign:'center',
			fontSize:'18px',
			padding:'6px 0px 6px 0px'
		}
		return (			
			<div>
				<span style={styleLabel}>ЛИЧНЫЙ СОСТАВ</span>
				<div style={styleBlock}>
					<div className="row">
						<div className="col-md-offset-2 col-md-2">
							<span style={styleHeader}>ГДЗ</span>
						</div>
						<div className="col-md-2">
							<span style={styleHeader}>ЗАНЯТО</span>
						</div>
						<div className="col-md-2">
							<span style={styleHeader}>ОСТ</span>
						</div>
						<div className="col-md-2">
							<span style={styleHeader}>ЗАНЯТО</span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-offset-2 col-md-2">
							<span style={styleString}>
								{this.props.dutyItem.combatGDZ}
							</span> 
						</div>
						<div className="col-md-2">
							<span style={styleString}>
								{this.props.dutyBusy.GDZ}
							</span>
						</div>
						<div className="col-md-2">
							<span style={styleString}>
								{this.props.dutyItem.combatOther}
							</span>
						</div>
						<div className="col-md-2">
							<span style={styleString}>
								{this.props.dutyBusy.OST}
							</span>
						</div>
					</div>
				</div>
				<span style={styleLabel}>{this.props.name}</span>
					{this.props.data[this.props.type].map((item, index) => (
						<DrillCarsEditItem key={item.id + '_' + index} data={item} type={this.props.type}/>
					))}
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	dutyItem:	state.drillDutyCurrentItem,
	dutyBusy:	state.drillCarsBlockEditStaffBusy,
	data: 		state.drillCarsBlockEdit
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  //
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
