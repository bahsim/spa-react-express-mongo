import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

import Signal from './TasksRecordEditHistory/Signal';
import Simple from './TasksRecordEditHistory/Simple';

var TasksRecordEditHistory = createReactClass({
	componentDidUpdate() {
		this.instance.style.height 
			= ((this.props.recordHeight - this.instance0.getBoundingClientRect().height
					- this.instance.getBoundingClientRect().top) - 25 ) + 'px';
	},
	getForm(item, index) {
		switch (item.type) {
			case 'newRec':
				return <Signal key={item.type + '_' + index} record={item}/>
				break;
			case 'closeToArchive':
			case 'pickupFromArchive':
			case 'deleteToArchive':
				return <Simple key={item.type + '_' + index} record={item}/>
				break;
			default:
				return ''
		}
	},
	render: function() {
		const styleTableHead = {
			fontSize:'18px',
			color:'#828282',
			padding:'2px',
			textAlign:'center',
			fontWeight: 700
		}
		const styleTableRowC = {
			fontSize:'18px',
			textAlign:'center'
		}
		const styleTableRowL = {
			fontSize:'18px',
			textAlign:'left'
		}
		return (
			<div>
				<div className="form-control" style={{fontSize:'16px'}}
					ref={(el) => this.instance0 = el }>
					<div className="row">
						<div className="col-md-3 col-md-offset-2">
						</div>
					</div>
				</div>
				<div ref={(el) => this.instance = el } 
						style={{padding:'0px 15px 0px 15px',overflow:'auto'}}>
					<br/>
					{this.props.registry.map(
						(item, index) => (this.getForm(item, index))
					)}
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	tasksFormEditState: state.tasksFormEditState,
	recordHeight: 			state.tasksRecordHeight,
	registry: 					state.tasksFormEdit.history	
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	//
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditHistory);
