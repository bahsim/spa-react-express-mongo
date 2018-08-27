import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var SignalPlace = createReactClass({
	displayMe(value) {
		return (
			this.props.record.type === value ? {display:''} : {display:'none'}
		)
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
		let value = this.props.record[name]
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
		const styleSelect = {fontSize:'17px',fontWeight:700}
		return (
			<div ref="block" style={styleBlock}>
				
				<h4 style={styleFieldLabel}>{'МЕСТОРАСПОЛОЖЕНИЕ'}</h4>
				
				{this.putRecordField('region', '')}
				{this.putRecordField('typeView', '')}
				
				<div style={this.displayMe('country')}>
					
					{this.putRecordField('note', 'ОРИЕНТИРЫ')}
					
				</div>
				<div style={this.displayMe('urban')}>
					
					{this.putRecordField('town', 'НАСЕЛЕННЫЙ ПУНКТ')}
					{this.putRecordField('street', 'УЛИЦА')}
					{this.putRecordField('number', 'ДОМ')}
					
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

export default connect(mapStateToProps, mapDispatchToProps)(SignalPlace);
