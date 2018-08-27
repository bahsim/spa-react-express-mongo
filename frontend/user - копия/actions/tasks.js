import store from '../store';
import * as types from '../constants/ActionTypes'

import 	{ 
					appIsLoading 
				} 
					from './main';
import 	{ 
					//
					putTasksFormEdit,
					//
					putTasksFormEditDate,
					putTasksFormEditTime,
					//
					putTasksFormEditCallerInit,
					putTasksFormEditSignalAtcInit,
					putTasksFormEditPlaceInit,
					putTasksFormEditCauseInit,
					putTasksFormEditExtraInfoInit,
					//
					putTasksFormEditCaller,
					putTasksFormEditSignalAtc,
					putTasksFormEditPlace,
					putTasksFormEditCause,
					putTasksFormEditExtraInfo,
					//
					putTasksFormEditStats,
					putTasksFormEditHistory,
					//
					refreshTasksFormEditPlace,
					selectTasksFormEditType,
					//
					putTasksFormEditCallcenterId,
					putTasksFormEditStationId
				} 
					from './tasksEdit';
import 	{ 
					genTasksDrillCombatCars,
					putTasksBusyCars/* ,
					putTasksFormEditCarsCombat */
				} 
					from './tasksEditCars';

const tasksRegistryCurrentItemInit01 = () => {
	return {
		//
		id: '3f1a551b-652e-4f63-8a15-5776864fb6cb',
		//
		date: '2018-05-15',
		time: '10:58',
		//
		dateEnd: '',
		timeEnd: '',
		//
		callcenterId: 	'3f1a551b-652e-4f63-8a15-5776864fb3cb',
		callcenterName: 'ЦППС г.Кокшетау',
		stationId:			'b8750514-e93b-4431-b864-cfbf78a22907',
		stationName:		'СПЧ-1',
		//
		type: 		'call101', //atc, call101
		typeView: 'звонок на 101', //сигнал АТЦ, звонок на 101
		//
		signalAtc: {
			signal: 			'kamal',
			signalView: 	'КАМАЛ',
			organization: 'городская поликлиника, 3 этаж'
		},
		caller: {
			firstname: 	'Иван',
			surname: 		'Иванов',
			middlename: 'Петрович',
			post: 			'',
			telephone: 	'87012568796',
			adress: 		'ул.Гоголя 86'
		},
		//
		place: {
			region: 	'г.Кокшетау',
			type: 		'urban',
			typeView: 'в населенном пункте',
			note: 		'',
			town: 		'',
			street: 	'ул.Абая',
			number: 	'34'
		},
		//
		cause: {
			type: 				'fire',
			typeView: 		'пожар',
			subtype: 			'common',
			subtypeView: 	'бытовой',
			note: 				'газбаллон'
		},
		//
		extraInfo: {
			objectType: 		'living', //living,store, nearby
			objectTypeView:	'жилой дом', //жилой дом, хоз.постройка, поблизости
			height: 				5,
			totalHeight: 		2,
			threatToHuman: 	true,
			threatToHumanView: 	'да', //да, нет
		},
		//
		stats: {
			localization: '11:11',
			liquidation:	'12:06'
		},
		//
		cars: [
			{
				id: 				'05fcb665-67ba-46cb-918c-5402e77afac7',
				stationName:'СПЧ-1',
				stationId:	'b8750514-e93b-4431-b864-cfbf78a22907',
				bortNomer: 	'1',
				name: 			'АЦ-5-40-5350',
				gosNomer: 	'023 КР 03',
				type: 			'main',
				typeView: 	'основная',
				GDZ: 				1,
				OST: 				1,
				time1: 			'12:00',
				time2: 			'12:15',
				time3: 			'',
				time4: 			'',
				returned:		false
			}
		],
		//
		history: [
			{
				date: '2018-05-15',
				time: '10:58',
				note: 'тревожный сигнал...'
			}
		],
		//
		done: false
		//
	}
}
const tasksRegistryCurrentItemInit02 = () => {
	return {
		//
		id: '3f1a551b-652e-4f63-8a15-5776864fb5cb',
		//
		date: '2018-05-15',
		time: '10:58',
		//
		dateEnd: '2018-05-15',
		timeEnd: '12:05',
		//
		callcenterId: 	'3f1a551b-652e-4f63-8a15-5776864fb3cb',
		callcenterName: 'ЦППС г.Кокшетау',
		stationId:			'b8750514-e93b-4431-b864-cfbf78a22907',
		stationName:		'СПЧ-1',
		//
		type: 		'atc', //atc, call101
		typeView: 'сигнал АТЦ', //сигнал АТЦ, звонок на 101
		//
		signalAtc: {
			signal: 			'kamal',
			signalView: 	'КАМАЛ',
			organization: 'городская поликлиника, 3 этаж'
		},
		caller: {
			firstname: 	'Иван',
			surname: 		'Иванов',
			middlename: 'Петрович',
			post: 			'',
			telephone: 	'87012568796',
			adress: 		'ул.Гоголя 86'
		},
		//
		place: {
			region: 	'г.Кокшетау',
			type: 		'urban',
			typeView: 'в населенном пункте',
			note: 		'',
			town: 		'',
			street: 	'ул.Абая',
			number: 	'34'
		},
		//
		cause: {
			type: 				'fire',
			typeView: 		'пожар',
			subtype: 			'common',
			subtypeView: 	'бытовой',
			note: 				'газбаллон'
		},
		//
		extraInfo: {
			objectType: 		'living', //living,store, nearby
			objectTypeView:	'жилой дом', //жилой дом, хоз.постройка, поблизости
			height: 				5,
			totalHeight: 		2,
			threatToHuman: 	true,
			threatToHumanView: 	'да', //да, нет
		},
		//
		stats: {
			localization: '11:10',
			liquidation:	'12:05'
		},
		//
		cars: [
			{
				id: 				'05fcb665-67ba-46cb-918c-5402e77afac7',
				stationName:'СПЧ-1',
				stationId:	'b8750514-e93b-4431-b864-cfbf78a22907',
				bortNomer: 	'1',
				name: 			'АЦ-5-40-5350',
				gosNomer: 	'023 КР 03',
				type: 			'main',
				typeView: 	'основная',
				GDZ: 				1,
				OST: 				1,
				time1: 			'13:00',
				time2: 			'13:15',
				time3: 			'14:25',
				time4: 			'14:40',
				returned:		true
			},
			{
				id: 				'4a87a0c3-2789-4ed3-a495-f65dc96b4949',
				stationName:'ПЧ-2',
				stationId:	'ba55d471-52ba-488d-b559-b68d7bb40f04',
				bortNomer: 	'1',
				name: 			'АЦ-8-40',
				gosNomer: 	'633 КР 03',
				type: 			'main',
				typeView: 	'основная',
				GDZ: 				1,
				OST: 				1,
				time1: 			'12:00',
				time2: 			'12:15',
				time3: 			'13:25',
				time4: 			'13:40',
				returned:		true
			}
		],
		//
		history: [
			{
				date: '2018-05-15',
				time: '10:58',
				note: 'тревожный сигнал...'
			}
		],
		//
		done: true
		//
	}
}

const tasksBusyCarsInit = () => {
	return [
		{  
			id: 				"05fcb665-67ba-46cb-918c-5402e77afac7",
			stationName:"ДСПТ К",
			stationId: 	"9057f181-e447-445f-800e-d5e9a6f84f16",
			bortNomer: 	"1",
			name: 			"АЦ-5-40-5350",
			gosNomer: 	"023 КР 03",
			type: 			"main",
			typeView: 	"основная",
			GDZ: 				1,
			OST: 				1
		},
		{  
			id: 				"e81c00ca-8db0-42d9-ace8-b4a5b531c4c6",
			stationName:"СПЧ-1",
			stationId: 	"b8750514-e93b-4431-b864-cfbf78a22907",
			bortNomer: 	"2",
			name: 			"АЦ-5-40-43114",
			gosNomer: 	"639 КР 03",
			type: 			"main",
			typeView: 	"основная",
			GDZ: 				0,
			OST: 				1
		}
	]
}

export function tasksPreLoading(value) {
	return (dispatch, getState) => {
		dispatch(putTasksDrillData(value.tasksDrillData));
		dispatch(genTasksDrillCombatCars());
		dispatch(putTasksBusyCars(value.tasksSendCars));
		dispatch(putTasksRegistryCurrent(value.tasksRegistry))
		const callcenters = getState().callcenters;
		for (let i=0; i<callcenters.length; i++) {
			if (callcenters[i].id === getState().user.callcenterId) {
				dispatch(selectTasksCallcenter(callcenters[i]));
				dispatch(selectTasksCallcenterId(callcenters[i].id));
				dispatch(selectTasksCallcenterFlag(true));
				dispatch(processTasksCallcenterSelect());
				break;
			}
		}
	}
}

export function putTasksDrillData(value) {
	return {
		type: types.PUT_TASKS_DRILL_DATA, value
	}
}

export function processTasksCallcenterSelect() {
	return (dispatch, getState) => {
		//
		let callcenterId = getState().tasksCallcenterId;
		let callcenterFlag = getState().tasksCallcenterFlag;
		let boolShowStations = true;
		//
		if (callcenterFlag === false || callcenterId === 'TASKS_CALLCENTER_ALL') {
			//
			dispatch(selectTasksStation({}));
			dispatch(selectTasksStationId(''));
			dispatch(selectTasksStationFlag(false));
			dispatch(processTasksStationSelect());
			//
			dispatch(putTasksStationsListFlag(false));
			//
		} else {
			//
			let stations = getState().stations;
			let myStations = stations.filter(
				item => item.callcenterId === callcenterId
			);
			//
			dispatch(putTasksStations(myStations));
			//
			if (myStations.length > 1) {
				//
				dispatch(selectTasksStation({}));
				dispatch(selectTasksStationId('TASKS_STATION_ALL'));
				dispatch(selectTasksStationFlag(true));
				dispatch(processTasksStationSelect());
				//
				dispatch(putTasksStationsListFlag(true));
				//
			} else if (myStations.length === 1) {
				//
				dispatch(selectTasksStation(myStations[0]));
				dispatch(selectTasksStationId(myStations[0].id));
				dispatch(selectTasksStationFlag(true));
				dispatch(processTasksStationSelect());
				//
				dispatch(putTasksStationsListFlag(true));
				//
			} else {
				//
				dispatch(selectTasksStation({}));
				dispatch(selectTasksStationId(''));
				dispatch(selectTasksStationFlag(false));
				dispatch(processTasksStationSelect());
				//
				dispatch(putTasksStationsListFlag(false));
				//
			}
		}
		//
		dispatch(filterTasksRegistryCurrent())
		dispatch(filterTasksRegistryHistory())
		//
	}
}

export function processTasksStationSelect() {
	return (dispatch, getState) => {
		//
		dispatch(filterTasksRegistryCurrent())
		dispatch(filterTasksRegistryHistory())
		//
	}
}

export function selectTasksCallcenter(value) {
	return {
		type: types.SELECT_TASKS_CALLCENTER, value
	}
}
export function selectTasksCallcenterId(value) {
	return {
		type: types.SELECT_TASKS_CALLCENTER_ID, value
	}
}
export function selectTasksCallcenterFlag(value) {
	return {
		type: types.SELECT_TASKS_CALLCENTER_FLAG, value
	}
}

export function putTasksStations(value) {
	return {
		type: types.PUT_TASKS_STATIONS, value
	}
}
export function selectTasksStation(value) {
	return {
		type: types.SELECT_TASKS_STATION, value
	}
}
export function selectTasksStationId(value) {
	return {
		type: types.SELECT_TASKS_STATION_ID, value
	}
}
export function putTasksStationsListFlag(value) {
	return {
		type: types.PUT_TASKS_STATIONS_LISTS_FLAG, value
	}
}
export function selectTasksStationFlag(value) {
	return {
		type: types.SELECT_TASKS_STATION_FLAG, value
	}
}

export function putTasksRegistryHeight(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_HEIGHT, value
	}
}
export function putTasksRegistryTab(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_TAB, value
	}
}

export function getTasksRegistryCurrent(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		let record = {
			workDay:	getState().workDay
		}
		fetch(url,{ method: 'POST', body: JSON.stringify(record) })
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				if (value.exit) {
					location.reload()
				}
				if (value.deny) {
					setTimeout(() => {
						dispatch(appIsLoading(false));
					},1000);
				}
				if (value.success) {
					dispatch(putTasksRegistryCurrent(value.registry));
					dispatch(filterTasksRegistryCurrent());
					setTimeout(() => {
						dispatch(appIsLoading(false));
					},1000);
				}
			})
			.catch((error) => {
				location.reload();
				dispatch(appIsLoading(false));
			})
		return true
	}
}
export function putTasksRegistryCurrent(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_CURRENT, value
	}
}
export function filterTasksRegistryCurrent() {
	return (dispatch, getState) => {
		//
		let items = JSON.parse(JSON.stringify(getState().tasksRegistryCurrent));
		let callcenterId = getState().tasksCallcenterId;
		let stationId = getState().tasksStationId;
		//
		if (callcenterId !== 'TASKS_CALLCENTER_ALL') {
			items = items.filter(
				item => item.callcenterId === callcenterId
			)
			if (stationId !== 'TASKS_STATION_ALL') {
				items = items.filter(
					item => item.stationId === stationId
				)
			}
		}
		//
		dispatch(putTasksRegistryCurrentFiltered(items));
		//
	}
}
export function putTasksRegistryCurrentFiltered(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_CURRENT_FILTERED, value
	}
}

export function getTasksRegistryHistory(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		let record = {
			dateStart:	getState().tasksRegistryHistoryPeriod.start,
			dateEnd: 		getState().tasksRegistryHistoryPeriod.end
		}
		fetch(url,{ method: 'POST', body: JSON.stringify(record) })
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				if (value.exit) {
					location.reload()
				}
				if (value.deny) {
					setTimeout(() => {
						dispatch(appIsLoading(false));
					},1000);
				}
				if (value.success) {
					dispatch(putTasksRegistryHistory(value.registry));
					dispatch(filterTasksRegistryHistory());
					const periodLabel = (new Date(record.dateStart)).toLocaleDateString() + ' - '
														+ (new Date(record.dateEnd)).toLocaleDateString()
					dispatch(putTasksRegistryHistoryPeriodLabel(periodLabel));
					setTimeout(() => {
						dispatch(appIsLoading(false));
						dispatch(putTasksWindowState('registry'));
					},1000);
				}
			})
			.catch((error) => {
				location.reload();
				dispatch(appIsLoading(false));
			})
		return true
	}
}
export function putTasksRegistryHistory(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_HISTORY, value
	}
}
export function filterTasksRegistryHistory() {
	return (dispatch, getState) => {
		//
		let items = JSON.parse(JSON.stringify(getState().tasksRegistryHistory));
		let callcenterId = getState().tasksCallcenterId;
		let stationId = getState().tasksStationId;
		//
		if (callcenterId !== 'TASKS_CALLCENTER_ALL') {
			items = items.filter(
				item => item.callcenterId === callcenterId
			)
			if (stationId !== 'TASKS_STATION_ALL') {
				items = items.filter(
					item => item.stationId === stationId
				)
			}
		}
		//
		dispatch(putTasksRegistryHistoryFiltered(items));
		//
	}
}
export function putTasksRegistryHistoryFiltered(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_HISTORY_FILTERED, value
	}
}
export function putTasksRegistryHistoryPeriod(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_HISTORY_PERIOD, value
	}
}
export function putTasksRegistryHistoryPeriodLabel(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_HISTORY_PERIOD_LABEL, value
	}
}

export function putTasksRegistryCurrentRecordId(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_CURRENT_RECORD_ID, value
	}
}
export function putTasksRegistryHistoryRecordId(value) {
	return {
		type: types.PUT_TASKS_REGISTRY_HISTORY_RECORD_ID, value
	}
}

export function putTasksWindowState(value) {
	return {
		type: types.PUT_TASKS_WINDOW_STATE, value
	}
}
export function putTasksFormEditState(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_STATE, value
	}
}
export function putTasksFormEditType(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_TYPE, value
	}
}

export function openTasksRecordNew(type) {
	return (dispatch, getState) => {
		// автопереход к своему call-центру
		const callcenters = getState().callcenters;
		const myCallcenterId = getState().user.callcenterId;
		callcenters.forEach((item) => {
			if (item.id === myCallcenterId) {
				dispatch(selectTasksCallcenter(item));
				dispatch(selectTasksCallcenterId(item.id));
				dispatch(selectTasksCallcenterFlag(true));
				dispatch(processTasksCallcenterSelect(item));
			}
		});
		//
		let workDate = new Date();
		let year = workDate.getFullYear();
		let month = workDate.getMonth() + 1;
		let day = workDate.getDate();
		month = (month<10 ? '0' + month : month);
		day = (day<10 ? '0' + day : day);
		//
		let hour = workDate.getHours();
		let minutes = workDate.getMinutes();
		hour = (hour<10 ? '0' + hour : hour);
		minutes = (minutes<10 ? '0' + minutes : minutes);
		//
		dispatch(putTasksFormEditDate(year + '-' + month + '-' + day));
		dispatch(putTasksFormEditTime(hour + ':' + minutes));
		//
		dispatch(putTasksFormEditState('new'));
		dispatch(putTasksFormEditType(type));
		dispatch(putTasksWindowState('recordEdit'));
		document.getElementById('panelSignalId').click();
		//
		dispatch(putTasksFormEditCallerInit());
		dispatch(putTasksFormEditSignalAtcInit());
		dispatch(putTasksFormEditPlaceInit());
		dispatch(putTasksFormEditCauseInit());
		dispatch(putTasksFormEditExtraInfoInit());
		//
		//const callcenters = getState().callcenters;
		const callcenterCurrent = getState().user.callcenterId;
		callcenters.forEach((entry) => {
			if (entry.id === callcenterCurrent) {
				dispatch(refreshTasksFormEditPlace({
					region: entry.region
				}))
			}
		});
		//
		dispatch(selectTasksFormEditType('fire'));
		//
		if (getState().user.callcenterId !== '') {
			dispatch(putTasksFormEditCallcenterId(getState().user.callcenterId));
		} else {
			dispatch(putTasksFormEditCallcenterId(''));
		}
		dispatch(putTasksFormEditStationId(''));
		//
		if (getState().user.stationId) {
			dispatch(putTasksFormEditStationId(getState().user.stationId));
		}
	}
}

export function openTasksRecordEditFromCar(item) {
	return (dispatch, getState) => {
		//
		const registry = getState().tasksRegistryCurrent;
		for (let i = 0; i < registry.length; i++) {
			if (registry[i].id === item.info.recordId) {
				//
				dispatch(putTasksRegistryCurrentRecordId(registry[i].id));
				dispatch(openTasksRecordEdit(registry[i]));
				//
				break;
			}
		}
		//
	}
}

export function openTasksRecordEdit(item) {
	return (dispatch, getState) => {
		//
		let stations = getState().drillStations;
		let found = false;
		stations.forEach((station) => {
			if (station.id === item.stationId) {
				found = true;
			}
		});
		if (found) {
			dispatch(putTasksFormEditState('edit'));
		} else {
			dispatch(putTasksFormEditState('view'));
		}
		switch (item.type) {
			case 'atc': 		
				dispatch(putTasksFormEditType('editAtc')); 
				break;
			case 'call101': 
				dispatch(putTasksFormEditType('editCall101')); 
				break;
		}
		//
		dispatch(putTasksFormEdit(item))
		//
		dispatch(putTasksFormEditCallcenterId(item.callcenterId));
		dispatch(putTasksFormEditStationId(item.stationId));
		//
		dispatch(putTasksWindowState('recordEdit'));
		document.getElementById('panelSignalId').click();
	}
}

export function openTasksRecordView(item) {
	return (dispatch, getState) => {
		//
		dispatch(putTasksFormEditState('view'));
		switch (item.type) {
			case 'atc': 		
				dispatch(putTasksFormEditType('editAtc')); 
				break;
			case 'call101': 
				dispatch(putTasksFormEditType('editCall101')); 
				break;
		}
		//
		dispatch(putTasksFormEdit(item))
		//
		dispatch(putTasksWindowState('recordEdit'));
		document.getElementById('panelSignalId').click();
		//
	}
}

