import React from 'react'
import { putDrillCarEditItem, 
				 genDrillCarsBlockEditStaffBusy } from '../../actions/drill';
import { connect } from 'react-redux'
import createReactClass from 'create-react-class';

import { Button } from 'reactstrap';

const Me = createReactClass({
	changeToReturn(bool) {
		this.putMe({toReturn:bool});
	},
	transferChange() {
		this.putMe();
	},
	changeState() {
		this.putMe();
	},
	changeGDZ() {
		var result = this.props.drillDutyCurrentItem.combatGDZ
								- this.props.drillCarsBlockEditStaffBusy.GDZ
								+ this.props.data.GDZ - this.refs.GDZ.value;
		if (result < 0) {
			return
		}
		this.putMe();
	},
	changeOST() {
		var result = this.props.drillDutyCurrentItem.combatOther
								- this.props.drillCarsBlockEditStaffBusy.OST
								+ this.props.data.OST - this.refs.OST.value;
		if (result < 0) {
			return
		}
		this.putMe();
	},
	putMe(args) {
		if (this.props.data.state === 'task') {
			return
		}
		if (this.props.data.state === 'transfered') {
			return
		}
		if (this.refs.state === undefined) {
			return 
		}
		var data = {}
		data.id = this.props.data.id;
		data.state = this.refs.state.value;
		if (!this.props.data.borrowed) {
			data.stationId = (this.refs.stationId ? this.refs.stationId.value : '');
		}
		data.toReturn = (this.refs.stationId ? this.refs.stationId.value : '');
		data.GDZ = 0;
		data.OST = 0;
		if (data.state === 'base') {
			data.GDZ = (this.refs.GDZ ? parseInt(this.refs.GDZ.value) : 0);
			data.OST = (this.refs.GDZ ? parseInt(this.refs.OST.value) : 0);
		} else {
			data.GDZ = 0;
			data.OST = 0;
		}
		if (args !== undefined) {
			if (args.toReturn !== undefined) {
				data.toReturn = args.toReturn
			}
		}
		this.props.putDrillCarEditItem(this.props.type,data)
		this.props.genDrillCarsBlockEditStaffBusy();
	},
	render: function() {
		const styleBlock = {
			borderTop:'1px solid #C0C0C0',
			borderRadius:'15px', 
			fontSize:'18px',
			margin:'5px 0px 0px 0px',
			padding:'5px 3px 5px 3px'
		}
		const styleHeader = {
			display:'block',
			textAlign:'center',
			fontWeight:700, 
			fontSize:'16px',
			color:'#828282'
		}
		const styleString = {
			display:'block',
			textAlign:'center',
			fontSize:'18px',
			padding:'6px 0px 6px 0px'
		}
		const styleInput = {
			padding:'6px 6px 6px 0px',
			height:'100%',
			textAlign:'center',
			fontSize:'16px',
			margin:'0px 0px 0px 0px',
			fontWeight:700
		}
		return (			
			<div style={styleBlock}>
				<div className="row">
					<div className="col-md-5">
						<div className="row">
							<div className="col-md-9">
								<span style={styleHeader}>СТАТУС</span>
							</div>
							<div className="col-md-3">
								<span style={styleHeader}>Б/Н</span>
							</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="row">
							<div className="col-md-6">
								<span style={styleHeader}>ТИП</span>
							</div>
							{this.props.data.state === 'transfer' || this.props.data.state === 'transfered' ?
								<div className="col-md-6">
									<span style={styleHeader}>П.ЧАСТЬ</span>
								</div>
							: ''
							}
							{this.props.data.state === 'base' || this.props.data.state === 'task' ?
								<div>
									<div className="col-md-3">
										<span style={styleHeader}>ГДЗ</span>
									</div>
									<div className="col-md-3">
										<span style={styleHeader}>ОСТ</span>
									</div>
								</div>
							: ''
							}
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-md-5">
						<div className="row">
							<div className="col-md-9">
								{this.props.data.state === 'task' ?
									<span style={styleString}>ВЫЕЗД</span>
								:
									<div>
										{this.props.data.state === 'transfered' ?
											<span style={styleString}>ПЕРЕБРОСКА</span>
										:
											<div>
												{this.props.data.borrowed ?
													<select ref="state" value={this.props.data.state}
														onChange={this.changeState} className="combobox form-control"
														style={{fontSize:'16px',fontWeight:700}}>
														<option style={{fontWeight:700}} value="">резерв</option>
														<option style={{fontWeight:700}} value="base">б/расчет</option>
														<option style={{fontWeight:700}} value="repair">ремонт</option>
														<option style={{fontWeight:700}} value="TO">ТО</option>
													</select>
												:
													<select ref="state" value={this.props.data.state}
														onChange={this.changeState} className="combobox form-control"
														style={{fontSize:'16px',fontWeight:700}}>
														<option style={{fontWeight:700}} value="">резерв</option>
														<option style={{fontWeight:700}} value="base">б/расчет</option>
														<option style={{fontWeight:700}} value="repair">ремонт</option>
														<option style={{fontWeight:700}} value="TO">ТО</option>
														<option style={{fontWeight:700}} value="transfer">переброска</option>
													</select>
												}
											</div>
										}
									</div>
								}
							</div>
							<div className="col-md-3">
								<span style={styleString}>
									{this.props.data.bortNomer}
								</span>
							</div>
						</div>
					</div>
					<div className="col-md-7">
						<div className="row">
							<div className="col-md-6">
								<span style={styleString}>
									{this.props.data.name}
								</span>
							</div>
							<div>
								{this.props.data.state === 'transfer' || this.props.data.state === 'transfered' ?
									<div className="col-md-6">
										{this.props.data.state === 'transfer' ?
											<select ref="stationId" value={this.props.data.stationId}
												onChange={this.transferChange} className="combobox form-control"
												style={{fontSize:'16px',fontWeight:700}}>
												<option key='1_1' style={{fontWeight:700}} value=''></option>
												{this.props.stations.map((item, index) => (
													<option key={item.id} style={{fontWeight:700}} value={item.id}>{item.name}</option>
												))}
											</select>
										:
											<span style={styleString}>
												{this.props.data.stationName}
											</span>
										}
									</div>
								:
									<div>
										<div className="col-md-3">
											{this.props.data.state === 'task' ?
												<span style={styleString}>
													{this.props.data.GDZ}
												</span>
											: ''
											}
											{this.props.data.state === 'base' ?
												<input type="number" className="form-control" style={styleInput} min="0"
												onChange={this.changeGDZ}
												ref="GDZ" value={this.props.data.GDZ} />
											: ''
											}
										</div>
										<div className="col-md-3">
											{this.props.data.state === 'task' ?
												<span style={styleString}>
													{this.props.data.OST}
												</span>
											: ''
											}
											{this.props.data.state === 'base' ?
												<input type="number" className="form-control" style={styleInput} min="0"
												onChange={this.changeOST}
												ref="OST" value={this.props.data.OST} />
											: ''
											}
										</div>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
				<div>
					{this.props.data.borrowed ?
						<div className="row">
							<div className="col-md-5">
								<div className="row">
									<div className="col-md-9">
										<span style={styleString}>НА ВРЕМЯ</span>
									</div>
									<div className="col-md-3">
									</div>
								</div>
							</div>
							<div className="col-md-7">
								<div className="row">
									<div className="col-md-6">
										<span style={styleString}>
											{this.props.data.stationName}
										</span>
									</div>
									{this.props.data.state !== 'task' ?
										<div className="col-md-6">
											{this.props.data.toReturn ? 
												<div>
												<Button color="info" onClick={() => this.changeToReturn(false)}>
													<b>ВЕРНУТЬ</b>
												</Button>
												</div>
											:
												<Button color="default" onClick={() => this.changeToReturn(true)}>
													<b>ВЕРНУТЬ</b>
												</Button>
											}
										</div>
									: ''
									}
								</div>
							</div>
						</div>
					:	''
					}
				</div>
			</div>
		)
	}
}); 

const mapStateToProps = (state, ownProps) => ({
	stations:											state.stations,
	drillDutyCurrentItem:					state.drillDutyCurrentItem,
	drillCarsBlockEditStaffBusy: 	state.drillCarsBlockEditStaffBusy
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  putDrillCarEditItem: (type,data) 		=> dispatch(putDrillCarEditItem(type,data)),
  genDrillCarsBlockEditStaffBusy: () 	=> dispatch(genDrillCarsBlockEditStaffBusy())
})

export default connect(mapStateToProps, mapDispatchToProps)(Me);
