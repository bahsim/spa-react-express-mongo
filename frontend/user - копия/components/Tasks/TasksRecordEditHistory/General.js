import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

var Signal = createReactClass({
	render: function() {
		const styleFieldLabel = {
			fontSize:'18px',
			color:'#828282'
		}
		return (
			<div style={styleFieldLabel} align='center'>
				{this.props.record.user.callcenterName}{', '}
				{this.props.record.user.stationName}{', '}
				{this.props.record.user.userName}{', '}
				{this.props.record.date}{', '}
				{this.props.record.time}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signal);
