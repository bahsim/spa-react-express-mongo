import React from 'react'
import { putAppMode } from '../../actions/main';
import { putUserForm } from '../../actions/hotkeys';
import { clearDrillHistoryData } from '../../actions/drillHistory';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

const Me = createReactClass({
	
	selectItem(item) {
		this.props.selectMenu(item);
		this.props.putUserForm(item);
		if (item === 'drillHistory') {
			this.props.clearDrillHistoryData()
		}
	},
	
	render: function() {
		
		const hrefManual = '/getDispatcherManual?sid=' + userSid;
		
		const styleLogo = {
			display:'block',
			marginLeft:'auto',
			marginRight:'auto'
		};
		
		const styleMenuLabel = {
			fontSize:'18px',
			fontWeight:700,
			color:'#f0ad4e',
			display:'block',
			textAlign:'center'
		};
		
		const styleTable = {
			fontSize:'18px',
			fontWeight:'700',
			cursor:'pointer', 
			color:'#828282'
		};
		
		const styleMenuItem = {
			textAlign:'center'
		};
		
		const styleBlock = {
			border:'1px solid grey',
			borderRadius:'5px',
			padding:'3px 3px 3px 3px'
		};
		
		return (
			<div>
				<div className="col-md-2">
					<img src="/logo2.png" style={styleLogo} width="47" height="41" alt="" />
					<img src="/logo3.png" style={styleLogo} width="171" height="33" alt="" />
					<br/>
				</div>
				<div className="col-md-10">
					<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
					<div className="row">
						<div className="col-md-2"></div>
						<div className="col-md-6" style={styleBlock}>
							<br/>
							<span style={styleMenuLabel}>
								{'СТРОЕВАЯ ЗАПИСКА'}
							</span>
							<table className="table table-hover" style={styleTable}>
								<tbody>
									<tr key="01" onClick={() => this.selectItem('drill')} style={styleMenuItem}>
										<td>{'ТЕКУЩЕЕ'}</td>
									</tr>
									<tr key="02" onClick={() => this.selectItem('drillHistory')} style={styleMenuItem}>
										<td>{'ИСТОРИЯ'}</td>
									</tr>
								</tbody>
							</table>
							<span style={styleMenuLabel}>
								{'ЖУРНАЛ ВЫЕЗДОВ'}
							</span>
							<table className="table table-hover" style={styleTable}>
								<tbody>
									<tr key="03" onClick={() => this.selectItem('tasks')} style={styleMenuItem}>
										<td>{'БОЕВЫЕ ВЫЕЗДЫ'}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="col-md-4"></div>
					</div>
					<div className="row">
						<div className="col-md-6 col-md-offset-2" 
							align="center" style={{fontSize:'16px',fontWeight:'700'}}>
							<br/>
							<a href={hrefManual}>{'РУКОВОДСТВО ПОЛЬЗОВАТЕЛЯ'}</a>
						</div>
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
  putUserForm: (item) 			=> dispatch(putUserForm(item)),
  selectMenu: (item) 				=> dispatch(putAppMode(item)),
  clearDrillHistoryData: () => dispatch(clearDrillHistoryData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
