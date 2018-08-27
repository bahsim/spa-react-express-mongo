import React from 'react'
import { putTasksFormEditCaller } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var TasksRecordEditCallerInput = createReactClass({
	putMe () {
		let item = {
			firstname: 	this.capitalizeFirstLetter(this.refs.firstname.value),
			surname: 		this.capitalizeFirstLetter(this.refs.surname.value),
			middlename: this.capitalizeFirstLetter(this.refs.middlename.value),
			post: 			this.refs.post.value,
			telephone: 	this.refs.telephone.value,
			adress: 		this.refs.adress.value
		}
		this.props.putTasksFormEditCaller(item);
	},
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
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
		return (
			<div onChange={() => this.putMe()} style={{cursor:'default'}}>
				
				<h4 style={styleFieldLabel}>{'ЗАЯВИТЕЛЬ'}</h4>
				
				<p><input placeholder="ФАМИЛИЯ" ref="surname" value={this.props.record.surname}
							type="text" className="form-control" style={styleFieldInput} /></p>
				
				<p><input placeholder="ИМЯ" ref="firstname" value={this.props.record.firstname}
							type="text" className="form-control" style={styleFieldInput} /></p>
				
				<p><input placeholder="ОТЧЕСТВО" ref="middlename" value={this.props.record.middlename}
							type="text" className="form-control" style={styleFieldInput} /></p>
				
				<p><input placeholder="ДОЛЖНОСТЬ" ref="post" value={this.props.record.post}
							type="text" className="form-control" style={styleFieldInput} /></p>
				
				<p><input placeholder="ТЕЛЕФОН" ref="telephone" value={this.props.record.telephone}
							type="text" className="form-control" style={styleFieldInput} /></p>
				
				<p><input placeholder="АДРЕС" ref="adress" value={this.props.record.adress}
							type="text" className="form-control" style={styleFieldInput} /></p>
							
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	record: state.tasksFormEditCaller
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksFormEditCaller: (value) => dispatch(putTasksFormEditCaller(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCallerInput);
