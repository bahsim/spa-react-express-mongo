import store from '../store';
import 	{ 
	putTasksRegistryCurrent,
	putTasksRegistryCurrentFiltered,
	filterTasksRegistryCurrent,
	putTasksRegistryCurrentRecordId,
	openTasksRecordEdit,
	putTasksWindowState,
	selectTasksCallcenter,
	selectTasksCallcenterId,
	selectTasksCallcenterFlag,
	processTasksCallcenterSelect,
	getTasksRegistryHistory
} from './tasks';
import 	{ 
					appIsLoading 
				} 
from './main';

import 	{
	processDrillStationSelect,
	putDrillTasksCars
} 
from './drill';
import 	{
	putTasksBusyCars
} 
from './tasksEditCars';
import * as types from '../constants/ActionTypes'

export function saveTasksNewRec(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		// проверка даты и время
		const date = getState().tasksFormEditDate;
		const time = getState().tasksFormEditTime;
		if (date === '' || time === '') {
			dispatch(appIsLoading(false));
			return false
		}
		//
		let found = false;
		const callcenters = getState().callcenters;
		let callcenter = {};
		callcenters.forEach((entry) => {
			if (entry.id == getState().tasksFormEditCallcenterId) {
				found = true;
				callcenter = entry;
			}
		});
		//const callcenter = getState().tasksCallcenter;
		if (found === false) {
			dispatch(appIsLoading(false));
			return false
		}
		found = false;
		const stations = getState().drillStations;
		let station = {};
		stations.forEach((entry) => {
			if (entry.id == getState().tasksFormEditStationId) {
				found = true;
				station = entry;
			}
		});
		if (found === false) {
			dispatch(appIsLoading(false));
			return false
		}
		if (callcenter === undefined || station === undefined) {
			dispatch(appIsLoading(false));
			return false
		}
		// собрать запись
		let record = {
			date, 
			time,
			callcenterId: callcenter.id,
			callcenterName: callcenter.name,
			stationId: station.id,
			stationName: station.name			
		}
		switch (getState().tasksFormEditType) {
			case 'editAtc':
				record.type 			= 'atc';
				record.typeView 	= 'сигнал АТЦ';
				break;
			case 'editCall101':
				record.type 			= 'call101';
				record.typeView 	= 'звонок на 101';
				break;
		}
		record.signalAtc 	= getState().tasksFormEditSignalAtc;
		record.caller 		= getState().tasksFormEditCaller;
		record.place 			= getState().tasksFormEditPlace;
		record.cause 			= getState().tasksFormEditCause;
		record.extraInfo 	= getState().tasksFormEditExtraInfo;
		record.stats = {
			localization: '',
			liquidation:	''
		}
		record.cars = []
		record.history = []
		// сделать запрос
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
					dispatch(putTasksRegistryCurrentRecordId(value.newId));
					//
					setTimeout(() => {
						//
						dispatch(appIsLoading(false));
						//
						dispatch(putTasksWindowState('registry'));
						// автопереход к своему call-центру
						const callcenters = getState().callcenters;
						const myCallcenterId = getState().user.callcenterId;
						callcenters.forEach((item) => {
							if (item.id === myCallcenterId) {
								//
								dispatch(selectTasksCallcenterId(''));
								//
								dispatch(selectTasksCallcenter(item));
								dispatch(selectTasksCallcenterId(item.id));
								dispatch(selectTasksCallcenterFlag(true));
								dispatch(processTasksCallcenterSelect(item));
							}
						});
						//
						const registry = getState().tasksRegistryCurrentFiltered;
						registry.forEach((item) => {
							if (item.id === value.newId) {
								dispatch(openTasksRecordEdit(item));
							}
						});
						//
					},500);
				}
			})
			.catch((error) => {
				//console.log(error);
				location.reload();
				dispatch(appIsLoading(false));
			})
		return true
	}
}
export function archiveTasksRec(url, mode) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined) {
			return false
		}
		if (formEdit.callcenterId === undefined) {
			return false
		}
		if (formEdit.stationId === undefined) {
			return false
		}
		//
		let workDate = getState().currentDateTimeClear;
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
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			dateEnd: 			year + '-' + month + '-' + day,
			timeEnd: 			hour + ':' + minutes,
			mode:					mode
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
					dispatch(putTasksRegistryCurrentRecordId(''));
					setTimeout(() => {
						dispatch(appIsLoading(false));
						dispatch(putTasksWindowState('registry'));
					},1000);
				}
			})
			.catch((error) => {
				console.log(error);
				//location.reload();
				dispatch(appIsLoading(false));
			})
		return true
	}
}
export function restoreTasksRec(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined) {
			return false
		}
		if (formEdit.callcenterId === undefined) {
			return false
		}
		if (formEdit.stationId === undefined) {
			return false
		}
		//
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId
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
					dispatch(putTasksRegistryCurrentRecordId(''));
					dispatch(getTasksRegistryHistory('getTasksRegistryHistory?sid=' + userSid));
				}
			})
			.catch((error) => {
				console.log(error);
				//location.reload();
				dispatch(appIsLoading(false));
			})
		return true
	}
}
export function sendTasksCars(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined || formEdit.callcenterId === undefined ||
				formEdit.stationId === undefined) {
			return false
		}
		const cars = getState().tasksCombatCarsSelect;
		let selected = [];
		cars.forEach((c) => {
			if (c.selected === true) {
				selected.push(c)
			}
		});
		if (selected.count < 1) {
			return false
		}
		//
		let workDate = getState().currentDateTimeClear;
		let hour = workDate.getHours();
		let minutes = workDate.getMinutes();
		hour = (hour<10 ? '0' + hour : hour);
		minutes = (minutes<10 ? '0' + minutes : minutes);
		//
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			cars:					selected,
			time: 				hour + ':' + minutes,
			extraInfo: {
				recordId:				formEdit.id,
				date:						formEdit.date,
				time:						formEdit.time,
				callcenterId:		formEdit.callcenterId,
				callcenterName:	formEdit.callcenterName
			}
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
					dispatch(putDrillTasksCars(value.drillTasksCars));
					dispatch(putTasksBusyCars(value.tasksSendCars));
					dispatch(refreshAfterSaveCombatCars(record.recordId, value.taskCombatCars));
					dispatch(processDrillStationSelect());
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
export function saveTasksCar(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined || formEdit.callcenterId === undefined ||
				formEdit.stationId === undefined) {
			return false
		}
		const carItem = getState().tasksFormEditCarsCombatItem;
		if (carItem.id === undefined) {
			return false
		}
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			carId:				carItem.id,
			time1:				carItem.time1,
			time2:				carItem.time2,
			time3:				carItem.time3,
			time4:				carItem.time4
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
					dispatch(refreshAfterSaveCombatCars(record.recordId, value.taskCombatCars));
					dispatch(processDrillStationSelect());
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
export function saveTasksCarsGroup(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined || formEdit.callcenterId === undefined ||
				formEdit.stationId === undefined) {
			return false
		}
		const cars = getState().tasksCombatCarsGroupEdit;
		if (cars.length ===0) {
			return false
		}
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			cars:					cars
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
					dispatch(refreshAfterSaveCombatCars(record.recordId, value.taskCombatCars));
					dispatch(processDrillStationSelect());
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
export function returnTasksCar(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined || formEdit.callcenterId === undefined ||
				formEdit.stationId === undefined) {
			return false
		}
		const carItem = getState().tasksFormEditCarsCombatItem;
		if (carItem.id === undefined) {
			return false
		}
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			carId:				carItem.id,
			carStationId:	carItem.stationId,
			time1:				carItem.time1,
			time2:				carItem.time2,
			time3:				carItem.time3,
			time4:				carItem.time4
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
					dispatch(putDrillTasksCars(value.drillTasksCars));
					dispatch(putTasksBusyCars(value.tasksSendCars));
					dispatch(refreshAfterSaveCombatCars(record.recordId, value.taskCombatCars));
					dispatch(processDrillStationSelect());
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
export function saveTasksStats(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined || formEdit.callcenterId === undefined ||
				formEdit.stationId === undefined) {
			return false
		}
		const stats = getState().tasksFormEditStats;
		if (stats.localization === undefined || stats.liquidation === undefined) {
			return false
		}
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			stats:				stats
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
					console.log(value);
					dispatch(refreshAfterSaveStats(record.recordId, value.taskStats));
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
export function saveTasksSignal(type, url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		const formEdit = getState().tasksFormEdit;
		if (formEdit.id === undefined || formEdit.callcenterId === undefined ||
				formEdit.stationId === undefined) {
			return false
		}
		let data = {}
		switch (type) {
			case 'date': 		
				data = {
					date: getState().tasksFormEditDate,
					time: getState().tasksFormEditTime
				}; 
				break;
			case 'caller': 	
				data = {
					caller: getState().tasksFormEditCaller
				}; 
				break;
			case 'place': 	
				data = {
					place: getState().tasksFormEditPlace
				}; 
				break;
			case 'station': 
				const callcenters = getState().callcenters;
				const callcenterId = getState().tasksFormEditCallcenterId;
				let found = false;
				let callcenter = {};
				callcenters.forEach((entry) => {
					if (found) return;
					if (entry.id == callcenterId) {
						found = true;
						callcenter = entry;
					}
				});
				if (found === false) {
					return false
				}
				found = false;
				const stations = getState().drillStations;
				const stationId = getState().tasksFormEditStationId;
				let station = {};
				stations.forEach((entry) => {
					if (found) return;
					if (entry.id == stationId) {
						found = true;
						station = entry;
					}
				});
				if (found === false) {
					return false
				}
				data = {
					callcenterId: 	callcenter.id,
					callcenterName: callcenter.name,
					stationId: 			station.id,
					stationName: 		station.name
				}; 
				break;
			case 'cause': 	
				data = {
					cause:			getState().tasksFormEditCause,
					extraInfo:	getState().tasksFormEditExtraInfo
				} 
				break;
			case 'atc': 		
				data = {
					signalAtc: getState().tasksFormEditSignalAtc
				}; 
				break;
		}
		let record = {
			recordId: 		formEdit.id,
			callcenterId: formEdit.callcenterId, 
			stationId: 		formEdit.stationId,
			data:					data
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
					dispatch(refreshAfterSaveSignal(record.recordId, value.taskItem));
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

export function refreshAfterSaveCombatCars(itemId, cars) {
	return (dispatch,getState) => {
		//
		let registry 	= JSON.parse(JSON.stringify(getState().tasksRegistryCurrent));
		let registryF = JSON.parse(JSON.stringify(getState().tasksRegistryCurrentFiltered));
		let record		= JSON.parse(JSON.stringify(getState().tasksFormEdit));
		//
		registry.forEach((entry) => {
			if (entry.id === itemId) { entry.cars = cars }
		});
		registryF.forEach((entry) => {
			if (entry.id === itemId) { entry.cars = cars }
		});
		if (record.id === itemId) {
			record.cars = cars;
		}
		//
		dispatch(putTasksRegistryCurrent(registry));
		dispatch(putTasksRegistryCurrentFiltered(registryF));
		dispatch(putTasksFormEdit(record));
		//
	}
}
export function refreshAfterSaveStats(itemId, stats) {
	return (dispatch,getState) => {
		//
		let registry 	= JSON.parse(JSON.stringify(getState().tasksRegistryCurrent));
		let registryF = JSON.parse(JSON.stringify(getState().tasksRegistryCurrentFiltered));
		let record		= JSON.parse(JSON.stringify(getState().tasksFormEdit));
		//
		registry.forEach((entry) => {
			if (entry.id === itemId) { entry.stats = stats }
		});
		registryF.forEach((entry) => {
			if (entry.id === itemId) { entry.stats = stats }
		});
		record.stats = stats;
		//
		dispatch(putTasksRegistryCurrent(registry));
		dispatch(putTasksRegistryCurrentFiltered(registryF));
		dispatch(putTasksFormEdit(record));
		//
	}
}
export function refreshAfterSaveSignal(itemId, data) {
	return (dispatch,getState) => {
		//
		let registry 	= JSON.parse(JSON.stringify(getState().tasksRegistryCurrent));
		let registryF = JSON.parse(JSON.stringify(getState().tasksRegistryCurrentFiltered));
		let record		= JSON.parse(JSON.stringify(getState().tasksFormEdit));
		//
		for (let i=0; i < registry.length; i++) {
			let entry = registry[i];
			if (registry[i].id === itemId) { 
				registry[i] = { ...registry[i], ...data}
				break;
			}
		}
		for (let i=0; i < registryF.length; i++) {
			if (registryF[i].id === itemId) { 
				registryF[i] = { ...registryF[i], ...data}
				break;
			}
		}
		record = JSON.parse(JSON.stringify({ ...record, ...data}))
		//
		dispatch(putTasksRegistryCurrent(registry));
		dispatch(filterTasksRegistryCurrent());
		dispatch(putTasksFormEdit(record));
		//
	}
}

export function putTasksFormEdit(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT, value
	}
}

export function putTasksFormEditCallcenterId(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CALLCENTER_ID, value
	}
}
export function putTasksFormEditStationId(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_STATION_ID, value
	}
}

export function putTasksFormEditDate(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_DATE, value
	}
}
export function putTasksFormEditTime(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_TIME, value
	}
}

export function putTasksFormEditCaller(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CALLER, value
	}
}
export function putTasksFormEditCallerInit() {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CALLER_INIT
	}
}

export function putTasksFormEditPlace(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_PLACE, value
	}
}
export function putTasksFormEditPlaceInit() {
	return {
		type: types.PUT_TASKS_FORM_EDIT_PLACE_INIT
	}
}
export function refreshTasksFormEditPlace(value) {
	return {
		type: types.REFRESH_TASKS_FORM_EDIT_PLACE, value
	}
}

export function selectTasksFormEditType(value) {
	return (dispatch,getState) => {
		getState().tasksTypes.forEach((entry) => {
			if (entry.id === value) {
				dispatch(refreshTasksFormEditCause({
					type: value,
					typeView: entry.name
				}));
			}
		});
		dispatch(putTasksSubTypes(getState().tasksFormEditCause.type));
		if (getState().tasksSubTypes.length > 0) {
			dispatch(refreshTasksFormEditCause({
				subtype: getState().tasksSubTypes[0].id
			}));
		} else {
			dispatch(refreshTasksFormEditCause({
				subtype: ''
			}));
		}
	}
}
export function selectTasksFormEditSubType(value) {
	return (dispatch,getState) => {
		getState().tasksSubTypes.forEach((entry) => {
			if (entry.id === value) {
				dispatch(refreshTasksFormEditCause({
					subtype: value,
					subtypeView: entry.name
				}));
			}
		});
	}
}
export function putTasksFormEditCause(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CAUSE, value
	}
}
export function putTasksFormEditCauseInit(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CAUSE_INIT
	}
}
export function refreshTasksFormEditCause(value) {
	return {
		type: types.REFRESH_TASKS_FORM_EDIT_CAUSE, value
	}
}
export function putTasksSubTypes(value) {
	return {
		type: types.PUT_TASKS_SUB_TYPES, value
	}
}

export function putTasksFormEditExtraInfo(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_EXTRA_INFO, value
	}
}
export function putTasksFormEditExtraInfoInit(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_EXTRA_INFO_INIT
	}
}
export function refreshTasksFormEditExtraInfo(value) {
	return {
		type: types.REFRESH_TASKS_FORM_EDIT_EXTRA_INFO, value
	}
}

export function putTasksFormEditStats(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_STATS, value
	}
}
export function refreshTasksFormEditStats(value) {
	return {
		type: types.REFRESH_TASKS_FORM_EDIT_STATS, value
	}
}

export function putTasksFormEditSignalAtc(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_SIGNAL_ATC, value
	}
}
export function putTasksFormEditSignalAtcInit(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_SIGNAL_ATC_INIT, value
	}
}

export function putTasksRecordHeight(value) {
	return {
		type: types.PUT_TASKS_RECORD_HEIGHT, value
	}
}

