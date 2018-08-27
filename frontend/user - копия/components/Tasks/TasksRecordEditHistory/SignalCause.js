import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

import ExtraInfo from './SignalCauseExtraInfo';

var SignalCause = createReactClass({
	displaySubTypes() {
		return (
			this.props.record.cause.subtypeView.length > 0 ? {display:''} : {display:'none'}
		);
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
		let value = this.props.record.cause[name]
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
		const styleBlock = {
			padding:'3px 3px 3px 3px',
			marginBottom: '3px'
		}
		return (
			<div ref="block" style={styleBlock}>
				
				<h4 style={styleFieldLabel}>{'ПРОИСШЕСТВИЕ'}</h4>
				
				{this.putRecordField('typeView', '')}
				
				<div style={this.displaySubTypes()}>
					{this.putRecordField('subtypeView', '')}
				</div>
				
				<ExtraInfo record={this.props.record}/>
				
				{this.putRecordField('note', 'ПРИМЕЧАНИЕ')}
				
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	//
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  //
})

export default connect(mapStateToProps, mapDispatchToProps)(SignalCause);
