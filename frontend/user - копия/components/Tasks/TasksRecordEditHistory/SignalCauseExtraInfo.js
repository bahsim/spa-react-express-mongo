import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var SignalExtraInfo = createReactClass({
	isThisCause() {
		return this.props.record.cause.type + '_' + this.props.record.cause.subtype
	},
	showHeightInput() {
		return this.props.record.extraInfo.objectType !== 'nearby' ? {display:''} : {display:'none'}
	},
	putRecordField(name,placeholder) {
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px'
		}
		const styleFieldInputEmpty = {
			fontSize:'18px',
			fontWeight:700,
			color: '#999',
			border:'1px solid #ccc',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px'
		}
		let value = this.props.record.extraInfo[name]
		return (
			value === '' ? 
				<p style={styleFieldInputEmpty}>{placeholder}</p>
			: 
				<p style={styleFieldInput}>{value}</p>
		)
	},
	render: function() {
		
		
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldLabelShort = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282',
			display:'block',
			textAlign:'right'
		}
		const styleFieldInput = {
			fontSize:'18px',
			fontWeight:700,
		}
		const styleFieldSelect = {
			fontSize:'18px',
			fontWeight:700,
			padding:'5px 0px 5px 5px',
			height:'40px'
		}
		
		
		switch (this.isThisCause()) {
			
			
			case 'fire_common': 
				return (
					<div>
						
						{this.putRecordField('objectTypeView', '')}
						
						<div style={this.showHeightInput()}>
							<div className="row">
								<div className="col-md-8">
									<h4 style={styleFieldLabelShort}>
										{'ЭТАЖНОСТЬ'}
									</h4>
								</div>
								<div className="col-md-4">
									
									{this.putRecordField('totalHeight', '')}
									
								</div>
							</div>
							<div className="row">
								<div className="col-md-8">
									<h4 style={styleFieldLabelShort}>
										{'ЭТАЖ (ПОДВАЛ=0)'}
									</h4>
								</div>
								<div className="col-md-4">
									
									{this.putRecordField('height', '')}
									
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">
								<h4 style={styleFieldLabelShort}>
									{'УГРОЗА ЛЮДЯМ'}
								</h4>
							</div>
							<div className="col-md-4">
								
								{this.putRecordField('threatToHumanView', '')}
								
							</div>
						</div>
					</div>
				)
				break;
			
			
			default:
				return <div></div>
				
				
		}
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	//
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  //
})

export default connect(mapStateToProps, mapDispatchToProps)(SignalExtraInfo);
