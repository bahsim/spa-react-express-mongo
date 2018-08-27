import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var SignalCaller = createReactClass({
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
		return (
			this.props.record[name] === '' ? 
				<p style={styleFieldInputEmpty}>{placeholder}</p>
			: 
				<p style={styleFieldInput}>{this.props.record[name]}</p>
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
				
				<h4 style={styleFieldLabel}>{'ЗАЯВИТЕЛЬ'}</h4>
				
				{this.putRecordField('surname',		'ФАМИЛИЯ')}
				{this.putRecordField('firstname',	'ИМЯ')}
				{this.putRecordField('middlename','ОТЧЕСТВО')}
				{this.putRecordField('post',			'ДОЛЖНОСТЬ')}
				{this.putRecordField('telephone',	'ТЕЛЕФОН')}
				{this.putRecordField('adress',		'АДРЕС')}
				
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

export default connect(mapStateToProps, mapDispatchToProps)(SignalCaller);
