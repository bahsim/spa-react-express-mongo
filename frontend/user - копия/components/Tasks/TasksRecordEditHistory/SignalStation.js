import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var SignalDate = createReactClass({
	putRecordField(type, value,placeholder) {
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
		const styleBlock = {
			padding:'3px 3px 3px 3px',
			marginBottom: '3px'
		}
		return (
			<div ref="block" style={styleBlock}>
			
				<h4 style={styleFieldLabel}>{'ПОЖАРНАЯ ЧАСТЬ'}</h4>
				
				{this.putRecordField('callcenterName', this.props.record.callcenterName,	'CALL-ЦЕНТР')}
				{this.putRecordField('stationName', this.props.record.stationName,	'НАИМЕНОВАНИЕ')}
						
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

export default connect(mapStateToProps, mapDispatchToProps)(SignalDate);
