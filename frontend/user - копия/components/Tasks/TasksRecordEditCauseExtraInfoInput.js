import React from 'react'
import { connect } from 'react-redux'
import { refreshTasksFormEditExtraInfo } from '../../actions/tasksEdit';
import createReactClass from 'create-react-class';

var TasksRecordEditCauseExtraInfoInput = createReactClass({
	selectObjectType() {
		let item = {}
		switch (this.refs.objectType.value) {
			case 'living':
				item = {
					objectType: 'living',
					objectTypeView: 'жилой дом'
				}
				break;
			case 'store':
				item = {
					objectType: 'store',
					objectTypeView: 'хоз.постройка'
				}
				break;
			case 'nearby':
				item = {
					objectType: 'nearby',
					objectTypeView: 'поблизости',
					objectType: 'nearby',
					totalHeight: 1,
					height: 1
				}
				break;
		}
		this.props.refreshRecord(item)
	},
	selectThreatToHuman() {
		(this.refs.threatToHuman.value === "true" ? 
			this.props.refreshRecord({
				threatToHuman: 			true,
				threatToHumanView:	'да'
			})
		: 
			this.props.refreshRecord({
				threatToHuman: 			false,
				threatToHumanView:	'нет'
			})
		)
	},
	selectTotalHeight() {
		this.props.refreshRecord({
			totalHeight: this.refs.totalHeight.value
		})
	},
	selectHeight() {
		this.props.refreshRecord({
			height: this.refs.height.value
		})
	},
	isThisCause() {
		return this.props.cause.type + '_' + this.props.cause.subtype
	},
	showHeightInput() {
		return this.props.record.objectType !== 'nearby' ? {display:''} : {display:'none'}
	},
	render: function() {
		
		const styleFieldLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282'
		}
		const styleFieldLabelShort = {
			fontSize:'18px',
			fontWeight:700,
			color:'#828282',
			display:'block',
			textAlign:'right'
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
		
		switch (this.isThisCause()) {
			
			
			case 'fire_common': 
				return (
					<div>
						<p><select className="combobox form-control" style={styleFieldSelect} 
								ref="objectType" onChange={() => this.selectObjectType()} value={this.props.record.objectType}>
							<option key="living" value="living">{'жилой дом'}</option>
							<option key="store" value="store">{'хоз.постройка'}</option>
							<option key="nearby" value="nearby">{'поблизости'}</option>
						</select></p>
						<div style={this.showHeightInput()}>
							<div className="row">
								<div className="col-md-8">
									<h4 style={styleFieldLabelShort}>
										{'ЭТАЖНОСТЬ'}
									</h4>
								</div>
								<div className="col-md-4">
									<input type="number" className="form-control" ref="totalHeight"
										value={this.props.record.totalHeight}
										onChange={() => this.selectTotalHeight()}
										style={styleFieldInput} />
								</div>
							</div>
							<div className="row">
								<div className="col-md-8">
									<h4 style={styleFieldLabelShort}>
										{'ЭТАЖ (ПОДВАЛ=0)'}
									</h4>
								</div>
								<div className="col-md-4">
									<input type="number" className="form-control" ref="height"
										value={this.props.record.height}
										onChange={() => this.selectHeight()}
										style={styleFieldInput} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-8">
								<h4 style={styleFieldLabelShort}>
									{'УГРОЗА ЛЮДЯМ'}
								</h4>
							</div>
							<div className="col-md-4">
								<p><select className="combobox form-control" style={styleFieldInput} 
										ref="threatToHuman" onChange={() => this.selectThreatToHuman()} 
										value={this.props.record.threatToHuman.toString()}>
									<option key="true" value="true">{'да'}</option>
									<option key="false" value="false">{'нет'}</option>
								</select></p>
							</div>
						</div>
					</div>
				)
				break;
			
			
			default:
				return <div></div>
				
				
		}
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	cause: 	state.tasksFormEditCause,
	record:	state.tasksFormEditExtraInfo
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshRecord: (value) => dispatch(refreshTasksFormEditExtraInfo(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(TasksRecordEditCauseExtraInfoInput);
