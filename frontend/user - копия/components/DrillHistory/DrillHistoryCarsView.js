import React from 'react'
import { connect } from 'react-redux'
import DrillCarsViewItem from './DrillHistoryCarsViewItem';
import createReactClass from 'create-react-class';

const Me = createReactClass({
	isBlockEmpty() {
		if (this.props.data.main.notEmpty || this.props.data.spec.notEmpty || this.props.data.extra.notEmpty ) {
			return {display: ''}
		}
		return {display: 'none'}
	},
	render: function() {
		return (
			<div style={this.isBlockEmpty()}>
				<DrillCarsViewItem name="ОСНОВНЫЕ ПОЖАРНЫЕ МАШИНЫ" data={this.props.data.main} type="main"/>
				<DrillCarsViewItem name="СПЕЦИАЛЬНЫЕ ПОЖАРНЫЕ МАШИНЫ" data={this.props.data.spec} type="spec"/>
				<DrillCarsViewItem name="ВСПОМОГАТЕЛЬНЫЕ МАШИНЫ" data={this.props.data.extra} type="extra"/>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	data:	state.drillHistoryCarsBlockView
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	//
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
