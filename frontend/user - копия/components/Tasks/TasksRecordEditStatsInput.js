import React from 'react'
import 	{ 
					putTasksFormEditStats,
					refreshTasksFormEditStats
				} from '../../actions/tasksEdit';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

var TasksRecordEditStatsInput = createReactClass({
	putMe() {
		this.props.putTasksFormEditStats({
			localization: this.refs.localization,
			liquidation:	this.refs.liquidation
		});
	},
	putLocalizationNow() {
		let d = new Date();
		let h = d.getHours();
		let m = d.getMinutes();
		h = (h < 10 ? '0' + h : h);
		m = (m < 10 ? '0' + m : m);
		this.props.refreshTasksFormEditStats({
			localization: h + ':' + m
		});
	},
	putLiquidationNow() {
		let d = new Date();
		let h = d.getHours();
		let m = d.getMinutes();
		h = (h < 10 ? '0' + h : h);
		m = (m < 10 ? '0' + m : m);
		this.props.refreshTasksFormEditStats({
			liquidation:	h + ':' + m
		});
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
			padding:'5px 0px 5px 5px'
		}
		const styleButton = {
			fontSize:'14px',
			fontWeight:700,
		}
		return (
			<div style={{cursor:'default'}}>
				<br/>
				<div className="row">
					<div className="col-md-4 col-md-offset-1">
						<h4 style={styleFieldLabel}>{'ЛОКАЛИЗАЦИЯ'}</h4>
					</div>
					<div className="col-md-3">
						<input type="time" className="form-control" style={styleFieldInput}
							value={
								this.props.record.localization !== '' &&  this.props.record.localization !== undefined ? 
									this.props.record.localization 
								: 
									''
								} 
							onChange={() => this.putMe()}
						/>
					</div>
					<div className="col-md-3">
						<Button color="default" style={styleButton} onClick={() => this.putLocalizationNow()}>
							{'СЕЙЧАС'}
						</Button>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4 col-md-offset-1">
						<h4 style={styleFieldLabel}>{'ЛИКВИДАЦИЯ'}</h4>
					</div>
					<div className="col-md-3">
						<input type="time" className="form-control" style={styleFieldInput} 
							value={
								this.props.record.liquidation !== '' &&  this.props.record.liquidation !== undefined ? 
									this.props.record.liquidation 
								: 
									''
								} 
							onChange={() => this.putMe()}
						/>
					</div>
					<div className="col-md-3">
						<Button color="default" style={styleButton} onClick={() => this.putLiquidationNow()}>
							{'СЕЙЧАС'}
						</Button>
					</div>
				</div>
				<br/>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	record:		state.tasksFormEditStats
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putTasksFormEditStats: (value) 			=> dispatch(putTasksFormEditStats(value)),
  refreshTasksFormEditStats: (value) 	=> dispatch(refreshTasksFormEditStats(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditStatsInput);
