import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

const TasksInformpPanel = createReactClass({
	render: function() {
		const styleLabel = { 
			fontSize:'18px', 
			fontWeight:700, 
			paddingBottom: '15px',
			color:'#828282', 
		}
		return (
			<div className="form-control" style={{fontSize:'16px'}}>
				<div className="row">
					<div className="col-md-4" style={{marginTop:'-3px'}}>
						<div style={this.props.callcenterFlag ? {display:''}: {display:'none'}}>
							{this.props.callcenterFlag ?
								<div>
									{this.props.callcenterId === 'TASKS_CALLCENTER_ALL' ? 
										<span style={styleLabel}>ОБЛАСТЬ</span>
									:
										<div>
											<span style={styleLabel}>{this.props.callcenter.name} </span>
										</div>
									}
								</div>
							: ''
							}
						</div>
					</div>
					<div className="col-md-4" style={{marginTop:'-3px'}}>
						{this.props.stationId === 'TASKS_STATION_ALL' ?
							<span style={styleLabel}>ЦОУСС</span>
						:
							<div>
								{this.props.stationsListFlag === true ?
									<span style={styleLabel}>{' ' + this.props.station.name}</span>
								: ''
								}
							</div>
						}
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	callcenter:				state.tasksCallcenter,
	callcenterId:			state.tasksCallcenterId,
	callcenterFlag:		state.tasksCallcenterFlag,
	stationsListFlag: state.tasksStationsListFlag,
	station: 					state.tasksStation,
	stationId:				state.tasksStationId
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  //
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksInformpPanel);
