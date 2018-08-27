import React from 'react'
import { putDrillMainStaffCurrentItem } from '../../actions/drill';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const DrillMainStaffEdit = createReactClass({
	putMe(e) {
		var dataSet = {
			manager: 		this.refs.manager.value,
			dispatcher: this.refs.dispatcher.value,
			onDuty: 		this.refs.onDuty.value
		}
		this.props.saveMe(dataSet)
	},
	render: function() {
		
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',
												margin:'0px 120px 0px 120px',padding:'3px 3px 3px 3px'}
		const styleLabel = {fontSize:'18px',display:'block',textAlign:'center',color:'#828282'}
		const styleInput = {padding:'5px 3px 5px 3px',height:'100%',fontSize:'18px',fontWeight:700}
		
		return (			
			
			<div style={styleBlock} onChange={this.putMe}>
				
				<span style={styleLabel}>НАЧАЛЬНИК КАРАУЛА</span>
				<input type="text" className="form-control" style={styleInput} 
					ref="manager" value={this.props.currentItem.manager} />

				<span style={styleLabel}>ДИСПЕТЧЕР</span>
				<input type="text" className="form-control" style={styleInput} 
					ref="dispatcher" value={this.props.currentItem.dispatcher} />

				<span style={styleLabel}>ДЕЖУРНЫЙ</span>
				<input type="text" className="form-control" style={styleInput} 
					ref="onDuty" value={this.props.currentItem.onDuty} />
				
			</div>
			
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	currentItem:	state.drillMainStaffCurrentItem
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveMe: (item) => dispatch(putDrillMainStaffCurrentItem(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillMainStaffEdit);
