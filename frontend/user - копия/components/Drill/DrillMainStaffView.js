import React from 'react'
import { connect } from 'react-redux'

import { appIsLoading } 					from '../../actions/main';
import { getStationMainStaffItem, 
				 saveDrillMainStaff} 			from '../../actions/drill';
import { putUserForm } 						from '../../actions/hotkeys';

import DrillMainStaffEdit from './DrillMainStaffEdit';
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const DrillMainStaffView = createReactClass({
	getInitialState () {
    return {
      isModalOpen: false
    };
  },
	selectItem() {
		this.openModal();
	},
	saveItem() {
		this.props.saveDrillMainStaff('saveDrillMainStaff?sid=' + userSid);
		this.props.putUserForm('drill');
	},
	restoreItem() {
		this.props.getStationMainStaffItem(this.props.dutyNumber);
		this.props.putUserForm('drill');
	},
	openModal(form) {
		if (this.state.isModalOpen) {
			this.setState({isModalOpen:false});
			return;
		}
		this.setState({isModalOpen:true});
		this.props.putUserForm('drillMainStaff');
		$(this.refs.modalForm).show();
		$(this.refs.modalForm).modal({backdrop: false, keyboard: false});
	},
	mouseHover(ref,color) {
		this.refs[ref].style.backgroundColor = color;
	},
	render: function() {
		const styleBlock = {border:'1px solid grey',borderRadius:'5px',padding:'3px 3px 3px 3px',cursor:'pointer'}
		const styleLabel = {fontSize:'16px',fontWeight:700,display:'block',textAlign:'center',color:'#828282'}
		const styleDiv = {border:'1px solid grey',borderRadius:'5px',
											padding:'3px 5px 3px 5px',margin:'0px 5px 0px 5px'}
		const styleString = {fontSize:'16px',fontWeight:700}
		return (
			<div ref="block" onClick={() => this.selectItem()} 
				style={{...styleBlock, 
								...{backgroundColor:(!this.props.saveFlags.mainStaff ? '#ebcccc': 'white')}}} 			
				onMouseEnter={() => this.mouseHover('block','#d9edf7')}
				onMouseLeave={() => this.mouseHover('block',(!this.props.saveFlags.mainStaff ? '#ebcccc': 'white'))}>
				
				<span style={styleLabel}>НАЧАЛЬНИК КАРАУЛА</span>
				<div style={styleDiv}>
					{ this.props.currentItem.manager !== '' ?  
						<span style={styleString}>
							{this.props.currentItem.manager}
						</span>
					: 
						<span style={styleString}>&nbsp;</span>
					}
				</div>

				<span style={styleLabel}>ДИСПЕТЧЕР</span>
				<div style={styleDiv}>
					{ this.props.currentItem.dispatcher !== '' ?  
						<span style={styleString}>
							{this.props.currentItem.dispatcher}
						</span>
					: 
						<span style={styleString}>&nbsp;</span>
					}
				</div>

				<span style={styleLabel}>ДЕЖУРНЫЙ</span>
				<div style={{...styleDiv, ...{marginBottom:'10px'}}}>
					{ this.props.currentItem.onDuty !== '' ?  
						<span style={styleString}>
							{this.props.currentItem.onDuty}
						</span>
					: 
						<span style={styleString}>&nbsp;</span>
					}
				</div>
				
				<div ref="modalForm" className="modal fade" 
						tabIndex="-1" role="dialog" style={{cursor:'default'}}>
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<div style={{marginLeft:'30%'}}>
									<Button color="warning" style={{color:'black'}} data-dismiss="modal"
										onClick={() => this.saveItem()}>
										<b>СОХРАНИТЬ</b>
									</Button>
									<Button color="default" style={{marginLeft:'20px'}} data-dismiss="modal"
										onClick={() => this.restoreItem()}>
										<b>ЗАКРЫТЬ</b>
									</Button>
								</div>
							</div>
							<div className="modal-body">
								<DrillMainStaffEdit/>
							</div>
							<div className="modal-footer"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	dutyNumber: 	state.dutyNumber,
	currentItem:	state.drillMainStaffCurrentItem,
	saveFlags:		state.drillSaveFlagsCurrentSet
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putUserForm: (item) 						=> dispatch(putUserForm(item)),
  getStationMainStaffItem: (item) => dispatch(getStationMainStaffItem(item)),
	saveDrillMainStaff: (url)				=> dispatch(saveDrillMainStaff(url)),
	appIsLoading: (bool)						=> dispatch(appIsLoading(bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrillMainStaffView);
