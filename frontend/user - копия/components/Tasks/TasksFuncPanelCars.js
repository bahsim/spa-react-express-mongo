import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

const TasksFuncPanelCars = createReactClass({
	refresh() {
		this.props.getTasksRegistryCurrent('getTasksRegistryCurrent?sid=' + userSid)
	},
	render: function() {
		const styleBtnRefresh 	= {cursor:'pointer',fontWeight:700,fontSize:'16px',color:'#828282'};
		return (
			<div className="form-control">
				<div className="row">
					<div className="col-md-2">
					</div>
					<div className="col-md-3">
					</div>
					<div className="col-md-2">
					</div>
					<div className="col-md-3">
					</div>
					<div className="col-md-2">
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

export default connect(mapStateToProps, mapDispatchToProps)(TasksFuncPanelCars);
