import React from 'react'
import { selectDrillHistoryStation, 
				 selectDrillHistoryStationFlag, 
				 processDrillHistoryStationSelect } from '../../actions/drillHistory';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
	componentDidUpdate() {
		setTimeout(() => {
			this.instance.style.height = ( window.innerHeight - this.instance.getBoundingClientRect().top - 50 ) + 'px'
		}, 100)
	},
	selectItem(item) {
		this.props.selectMenu(item);
		this.props.selectMenuFlag(true);
		this.props.processSelect(item);
	},
	menuCurrentId() {
		return this.props.menuCurrent ? this.props.menuCurrent.id : ''
	},
	render: function() {
		return (
			<div>
				<br/>
				<div ref={(el) => this.instance = el } style={{overflow:'auto'}}>
					<table className="table table-hover" 
						style={{fontSize:'16px',fontWeight:'700',cursor:'pointer'}}>
						<tbody>
							{this.props.items.map((item, index) => (
								<tr key={item.id} id={item.id}
									onClick={() => this.selectItem(item)}
									className={this.menuCurrentId() === item.id ? 'info' : ''}>
									<td>{item.name}</td>
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
  menuCurrent: 	state.drillHistoryStation,
  items: 				state.drillHistoryStations,
  appMode: 			state.appMode
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	selectMenu: 		(item) 	=> dispatch(selectDrillHistoryStation(item)),
  selectMenuFlag: (value) => dispatch(selectDrillHistoryStationFlag(value)),
	processSelect: 	(item) 	=> dispatch(processDrillHistoryStationSelect(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
