import React from 'react'
import { refreshTasksFormEditPlace } from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var TasksRecordEditPlaceInput = createReactClass({
	displayMe(value) {
		return (
			this.props.record.type === value ? {display:''} : {display:'none'}
		)
	},
	putMe(e,that) {
		let item = {}
		item[e.target.getAttribute('myprop')] = e.target.value;
		if (e.target.getAttribute('myprop') === 'type') {
			item.typeView = (
				e.target.value === 'urban' ? 
					'в населенном пункте' 
				: 
					'вне населенного пункта'
			)
		}
		this.props.refreshTasksFormEditPlace(item)
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
		const styleSelect = {fontSize:'17px',fontWeight:700}
		return (
			<div style={{cursor:'default'}}>
				<h4 style={styleFieldLabel}>{'МЕСТОРАСПОЛОЖЕНИЕ'}</h4>
				<p><select className="combobox form-control" myprop="region"
						onChange={(e) => this.putMe(e)}
						style={styleFieldSelect} value={this.props.record.region ? this.props.record.region : ''}>
					<option value="г.Кокшетау">{'г.Кокшетау'}</option>
					<option value="г.Степногорск">{'г.Степногорск'}</option>
					<option value="Аккольский район">{'Аккольский район'}</option>
					<option value="Аршалынский район">{'Аршалынский район'}</option>
					<option value="Астраханский район">{'Астраханский район'}</option>
					<option value="Атбасарский район">{'Атбасарский район'}</option>
					<option value="Буландинский район">{'Буландинский район'}</option>
					<option value="Бурабайский район">{'Бурабайский район'}</option>
					<option value="Ерейментауский район">{'Ерейментауский район'}</option>
					<option value="Есильский район">{'Есильский район'}</option>
					<option value="Егиндыкольский район">{'Егиндыкольский район'}</option>
					<option value="Жаркаинский район">{'Жаркаинский район'}</option>
					<option value="Жаксынский район">{'Жаксынский район'}</option>
					<option value="Зерендинский район">{'Зерендинский район'}</option>
					<option value="Коргалжинский район">{'Коргалжинский район'}</option>
					<option value="район Биржан Сал">{'район Биржан Сал'}</option>
					<option value="Сандыктауский район">{'Сандыктауский район'}</option>
					<option value="Целиноградский район">{'Целиноградский район'}</option>
					<option value="Шортандинский район">{'Шортандинский район'}</option>
				</select></p>
				<p><select 
					className="combobox form-control" myprop="type"
						onChange={(e) => this.putMe(e)}
						style={styleFieldSelect} value={this.props.record.type ? this.props.record.type : ''}>
					<option style={styleSelect} value="urban">{'в населенном пункте'}</option>
					<option style={styleSelect} value="country">{'вне населенного пункта'}</option>
				</select></p>
				<div style={this.displayMe('country')}>
					<p><input placeholder="ОРИЕНТИРЫ" myprop="note" value={this.props.record.note ? this.props.record.note : ''}
								onChange={(e) => this.putMe(e)}
								type="text" className="form-control" style={styleFieldInput} /></p>
				</div>
				<div style={this.displayMe('urban')}>
					<p><input placeholder="НАСЕЛЕННЫЙ ПУНКТ" myprop="town" value={this.props.record.town ? this.props.record.town : ''}
								onChange={(e) => this.putMe(e)}
								type="text" className="form-control" 
								style={styleFieldInput} /></p>
					<p><input placeholder="УЛИЦА" myprop="street" value={this.props.record.street ? this.props.record.street : ''}
								onChange={(e) => this.putMe(e)}
								type="text" className="form-control" 
								style={styleFieldInput} /></p>
					<p><input placeholder="ДОМ" myprop="number" value={this.props.record.number ? this.props.record.number : ''}
								onChange={(e) => this.putMe(e)}
								type="text" className="form-control" 
								style={styleFieldInput} /></p>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	record: state.tasksFormEditPlace
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshTasksFormEditPlace: (value) => dispatch(refreshTasksFormEditPlace(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditPlaceInput);
