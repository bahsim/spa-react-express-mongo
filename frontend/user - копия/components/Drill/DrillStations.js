import React from 'react'
import { selectDrillStation, 
				 processDrillStationSelect } from '../../actions/drill';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const DrillStations = createReactClass({
	componentDidUpdate() {
		setTimeout(() => {
			this.instance.style.height = ( window.innerHeight - this.instance.getBoundingClientRect().top - 50 ) + 'px'
		}, 100)
	},
	selectItem(item) {
		this.props.selectMenu(item);
		this.props.processDrillStationSelect();
	},
	menuCurrentId() {
		return this.props.menuCurrent ? this.props.menuCurrent.id : ''
	},
	getItemColor(id) {
		return (
			this.menuCurrentId() === id ? 
				'info' 
			: this.props.saveFlags[id] ? 
					'' 
				: 
					'danger'
		)
	},
	render: function() {
		const styleBlock = {
			overflow:'auto'
		}
		const styleTable = {
			fontSize:'16px',
			fontWeight:'700',
			cursor:'pointer'
		}
		return (
			<div>
				<br/>
				<div ref={(el) => this.instance = el } style={styleBlock}>
					<table className="table table-hover" style={styleTable}>
						<tbody>
							{this.props.items.map((item, index) => (
								<tr key={item.id} onClick={() => this.selectItem(item)}
									className={this.getItemColor(item.id)}>
									<td>
										{item.name}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
  menuCurrent: 	state.drillStationCurrent,
  items: 				state.drillStations,
  dutyNumber: 	state.dutyNumber,
	saveFlags:		state.drillLastSaveFlagGlobal,
  appMode: 			state.appMode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	selectMenu: 							 (item) => dispatch(selectDrillStation(item)),
	processDrillStationSelect: () 		=> dispatch(processDrillStationSelect()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillStations);
