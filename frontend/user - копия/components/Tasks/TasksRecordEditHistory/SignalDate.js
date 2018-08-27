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
		if (type === 'date') {
			return (
				value === '' ? 
					<p style={styleFieldInputEmpty}>{placeholder}</p>
				: 
					<p style={styleFieldInput}>{(new Date(value)).toLocaleDateString()}</p>
			)
		} else {
			return (
				value === '' ? 
					<p style={styleFieldInputEmpty}>{placeholder}</p>
				: 
					<p style={styleFieldInput}>{value}</p>
			)
		}
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
			
				<h4 style={styleFieldLabel}>{'ДАТА И ВРЕМЯ ОБРАЩЕНИЯ'}</h4>
				
				<div className="row">
					<div className="col-md-7">
						
						{this.putRecordField('date', this.props.record.date, 'ДАТА')}
						
					</div>
					<div className="col-md-5">
						
						{this.putRecordField('time', this.props.record.time, 'ВРЕМЯ')}
						
					</div>
				</div>
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
