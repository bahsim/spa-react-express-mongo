import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
	render: function() {
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px'}
		const styleLabel = {fontSize:'16px',fontWeight:700,display:'block',textAlign:'center',color:'#828282'}
		const styleDiv = {border:'1px solid grey',borderRadius:'5px',
											padding:'3px 5px 3px 5px',margin:'0px 5px 0px 5px'}
		const styleString = {fontSize:'16px',fontWeight:700}
		return (
			<div ref="block" style={styleBlock}>
				<span style={styleLabel}>НАЧАЛЬНИК КАРАУЛА</span>
				<div style={styleDiv}>
					{ this.props.currentItem.manager !== '' ?  
						<span style={styleString}>
							{this.props.currentItem.manager}
						</span>
					: 
						<span style={styleString}>&nbsp;</span>
					}
				</div>

				<span style={styleLabel}>ДИСПЕТЧЕР</span>
				<div style={styleDiv}>
					{ this.props.currentItem.dispatcher !== '' ?  
						<span style={styleString}>
							{this.props.currentItem.dispatcher}
						</span>
					: 
						<span style={styleString}>&nbsp;</span>
					}
				</div>

				<span style={styleLabel}>ДЕЖУРНЫЙ</span>
				<div style={{...styleDiv, ...{marginBottom:'10px'}}}>
					{ this.props.currentItem.onDuty !== '' ?  
						<span style={styleString}>
							{this.props.currentItem.onDuty}
						</span>
					: 
						<span style={styleString}>&nbsp;</span>
					}
				</div>
				
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	currentItem:	state.drillHistoryDataSetStation.mainStaff
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  //
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
