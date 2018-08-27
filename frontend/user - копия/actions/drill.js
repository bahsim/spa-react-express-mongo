import store from '../store';
import { appIsLoading } from './main';
import { putTasksDrillData } from './tasks';
import { genTasksDrillCombatCars } from './tasksEditCars';
import * as types from '../constants/ActionTypes'

export function drillPreLoading(value) {
	return (dispatch, getState) => {
		dispatch(putDrillStations(value.stationsOwn));
		dispatch(putDrillDuties(value.drillDuties));
		dispatch(putDrillDutiesCars(value.drillDutiesCars));
		dispatch(putDrillCars(value.drillCars));
		dispatch(putDrillAbsentCars(value.drillAbsentCars));
		dispatch(putDrillTasksCars(value.drillTasksCars));
		dispatch(putDrillSupply(value.drillSupply));
		dispatch(putDrillMainStaff(value.drillMainStaff));
		dispatch(putDrillLastSave(value.drillLastSave));
		dispatch(genStationsLastSaveFlag());
		//
		dispatch(genDrillStats());
		//
		if (getState().drillStations.length > 0) {
			dispatch(selectDrillStation(getState().drillStations[0]));
			dispatch(processDrillStationSelect());
		}
	}
}

export function genDrillStats() {
	return (dispatch, getState) => {
		//
		var generalStat = {
			fireStationsCount: { basic: 0, other: 0 },
			personnelCount: { basic: 0, other: 0 },
			personnelGDZCount: { basic: 0, other: 0 },
			carsMain: { basic: 0, other: 0 },
			carsSpec: { basic: 0, other: 0 },
			carsExtra: { basic: 0, other: 0 },
			reserveCarsMain: { basic: 0, other: 0 },
			reserveCarsSpec: { basic: 0, other: 0 },
			reserveCarsExtra: { basic: 0, other: 0 }	
		}
		//
		const stations 		= getState().drillStations;
		const cars 				= getState().drillCars;
		const absentCars 	= getState().drillAbsentCars;
		const dutiesCars 	= getState().drillDutiesCars;
		const dutyNumber 	= getState().dutyNumber;
		//
		stations.forEach((station, stationIndex) => {
			var segment = '';
			switch (station.type) {
			case 'ПЧ': 
			case 'СПЧ':
			case 'ПП':
				segment = 'basic'; break;
			case 'ДПФ':
				segment = 'other'; break;
			}
			// общее количество ПЧ
			generalStat.fireStationsCount[segment] += 1;
			//
			// добавить данные по личному составу
			const duties = getState().drillDuties;
			duties.forEach(function(dutySet) {
				if (dutySet.id === station.id) {
					generalStat.personnelCount[segment] 		+= dutySet['duty0'+ dutyNumber].combatTotal;
					generalStat.personnelGDZCount[segment] 	+= dutySet['duty0'+ dutyNumber].combatGDZ;
				}
			});
			// получить машины текущей ПЧ
			const carsFiltered2 = cars.filter(
				car => car.stationId === station.id
			);
			const carsFiltered1 = JSON.parse(JSON.stringify(carsFiltered2));
			// пометить машины Ремонт ТО Переброска
			absentCars.forEach((entry) => {
				if (entry.id !== station.id) { return}
				entry.cars.forEach((car) => {
					if (carsFiltered1.length === 0) {
						var entry2 = JSON.parse(JSON.stringify(car))
						if (entry2.state === 'borrowed') {
							entry2.state = '';
						}
						carsFiltered1.push(entry2);
					} else {
						for (var i=0; i<carsFiltered1.length; i++) {
							if (car.id === carsFiltered1[i].id && !carsFiltered1[i].state) {
								carsFiltered1[i] = {...carsFiltered1[i], ...car}
								break;
							}
							if (i === carsFiltered1.length-1) {
								var entry2 = JSON.parse(JSON.stringify(car))
								if (entry2.state === 'borrowed') {
									entry2.state = '';
								}
								carsFiltered1.push(entry2);
								break;
							}
						}
					}
				});
			});
			// пометить машины в боевой расчет
			dutiesCars.forEach((dutyCars) => {
				if (dutyCars.id !== station.id) { return }
				const dutyCarsItem = dutyCars['duty0' + dutyNumber]
				dutyCarsItem.cars.forEach((entry) => {
					if (carsFiltered1.length === 0) {
						carsFiltered1.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
					} else {
						for (var i=0; i<carsFiltered1.length; i++) {
							if (entry.id === carsFiltered1[i].id && !carsFiltered1[i].state) {
								carsFiltered1[i].state = 'base';
								carsFiltered1[i].GDZ 	= entry.GDZ;
								carsFiltered1[i].OST 	= entry.OST;
								carsFiltered1[i].duty 	= getState().dutyNumber;
								break;
							}
							if (i === carsFiltered1.length-1) {
								carsFiltered1.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
								break;
							}
						}
					}
				});
			});			
			// вывести статистику
			var carsMainTotal = 0, 		carsSpecTotal = 0, 		carsSpecTotal = 0;
			var carsMainReserve = 0, 	carsSpecReserve = 0, 	carsSpecReserve = 0;
			//
			carsFiltered1.forEach((car) =>{
				switch (car.type) {
					case 'main':
						if (car.state === 'base') { 
							generalStat.carsMain[segment] += 1 
						}
						if (car.state === '' || car.state === undefined) { 
							generalStat.reserveCarsMain[segment] += 1 
						}
						break;
					case 'spec':
						if (car.state === 'base') { 
							generalStat.carsSpec[segment] += 1
						}
						if (car.state === '' || car.state === undefined) { 
							generalStat.reserveCarsSpec[segment] += 1 
						}
						break;
					case 'extra':
						if (car.state === 'base') { 
							generalStat.carsExtra[segment] += 1 
						}
						if (car.state === '' || car.state === undefined) { 
							generalStat.reserveCarsExtra[segment] += 1 
						}
						break;
				}
			});
			//
		});
		//
		dispatch(putDrillStats(generalStat));
		//
	}
}
export function putDrillStats(data) {
	return { type: types.PUT_DRILL_STATS, data }
}

export function putDrillStations(data) {
	return { type: types.PUT_DRILL_STATIONS, data }
}
export function selectDrillStation(item) {
	return { type: types.SELECT_DRILL_STATION, item }
}
export function selectDrillStationFlag(value) {
	return { type: types.SELECT_DRILL_STATION_FLAG, value }
}

export function processDrillStationSelect() {
	return (dispatch, getState) => {
		dispatch(selectDrillStationFlag(true));
		//
		dispatch(getStationDutySet(getState().drillStationCurrent.id));
		dispatch(getStationDutyItem(getState().dutyNumber));
		//
		dispatch(getStationDutyCarsSet(getState().drillStationCurrent.id));
		dispatch(getStationDutyCarsItem(getState().dutyNumber));						
		dispatch(getStationDrillCarsSet());
		dispatch(getStationDrillAbsentCarsSet());
		dispatch(getStationDrillTasksCarsSet());
		//
		dispatch(compileDrillCarsBlockView());						
		//
		dispatch(getStationSupplySet());
		//
		dispatch(getStationMainStaffSet(getState().drillStationCurrent.id));
		dispatch(getStationMainStaffItem(getState().dutyNumber));
		//
		dispatch(getStationLastSaveSet(getState().drillStationCurrent.id));
		dispatch(genDrillSaveFlagsCurrentSet(getState().dutyNumber));
	}
}

export function putDrillDuties(data) {
	return { type: types.PUT_DRILL_DUTIES, data }
}
const dutySet = {total: 0, vacation: 0, illness: 0, missionOut: 0, missionIn: 0, otherOut: 0, 
									vacant: 0, present: 0, onDuty: 0, dispatchers: 0, notPrepared: 0, 
									combatTotal: 0, combatGDZ: 0, combatOther: 0}
const stationDutySet = {id:'',name:'',duty01:dutySet,duty02:dutySet,duty03:dutySet,duty04:dutySet}
export function getStationDutySet(stationId) {
	return (dispatch, getState) => {
		const duties = getState().drillDuties;
		var empty = true;
		duties.forEach(function(entry) {
			if (entry.id === stationId) {
				empty = false;
				dispatch(putDrillDutyCurrentSet(entry))
			}
		});
		if (empty) {
			var emptySet = stationDutySet;
			emptySet.id = stationId;
			dispatch(putDrillDutyCurrentSet(emptySet))
		}
	}
}
export function putDrillDutyCurrentSet(data) {
	return { type: types.PUT_DRILL_DUTY_CURRENT_SET, data }
}
export function getStationDutyItem(index) {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const dutyCurrentSet = getState().drillDutyCurrentSet;
			const dutyItem = dutyCurrentSet['duty0' + index]
			if (dutyItem) {
				dispatch(putDrillDutyCurrentItem(dutyItem))
			} else {
				dispatch(putDrillDutyCurrentItem(dutySet))
			}
		}
	}
}
export function putDrillDutyCurrentItem(data) {
	return { type: types.PUT_DRILL_DUTY_CURRENT_ITEM, data }
}

export function putDrillDutiesCars(data) {
	return { type: types.PUT_DRILL_DUTIES_CARS, data }
}
const dutyCarsSet = {combatGDZbusy: 0, combatOtherBusy: 0, cars: []}
const stationDutyCarsSet = {id:'',name:'',duty01:dutyCarsSet,duty02:dutyCarsSet,duty03:dutyCarsSet,duty04:dutyCarsSet}
export function getStationDutyCarsSet(stationId) {
	return (dispatch, getState) => {
		const dutiesCars = getState().drillDutiesCars;
		var empty = true;
		dutiesCars.forEach(function(entry) {
			if (entry.id === stationId) {
				empty = false;
				dispatch(putDrillDutyCarsCurrentSet(entry))
			}
		});
		if (empty) {
			var emptySet = stationDutyCarsSet;
			emptySet.id = stationId;
			dispatch(putDrillDutyCarsCurrentSet(emptySet))
		}
	}
}
export function putDrillDutyCarsCurrentSet(data) {
	return { type: types.PUT_DRILL_DUTY_CARS_CURRENT_SET, data }
}
export function getStationDutyCarsItem(index) {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const DutyCarsCurrentSet = getState().drillDutyCarsCurrentSet;
			const dutyCarsItem = DutyCarsCurrentSet['duty0' + index]
			if (dutyCarsItem) {
				dispatch(putDrillDutyCarsCurrentItem(dutyCarsItem))
			} else {
				dispatch(putDrillDutyCarsCurrentItem(dutyCarsSet))
			}
		}
	}
}
export function putDrillDutyCarsCurrentItem(data) {
	return { type: types.PUT_DRILL_DUTY_CARS_CURRENT_ITEM, data }
}

export function saveDuty(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		var ready = true;
		var record = {
			id: 		getState().drillStationCurrent.id,
			name: 	getState().drillStationCurrent.name,
			index: 	getState().drillStationCurrent.index,
			duty:		'duty0' + getState().dutyNumber,
			item: 	getState().drillDutyCurrentItem
		};
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
					dispatch(putDrillDuties(value.duties));
					dispatch(putTasksDrillData(value.tasksDrillData));
					dispatch(genTasksDrillCombatCars());
					setTimeout(() => {
						dispatch(getStationDutySet(getState().drillStationCurrent.id));
						dispatch(getStationDutyItem(getState().dutyNumber));
						if (value.drillLastSave) {
							dispatch(putDrillLastSave(value.drillLastSave));
							dispatch(genStationsLastSaveFlag());
							dispatch(getStationLastSaveSet(getState().drillStationCurrent.id));
							dispatch(genDrillSaveFlagsCurrentSet(getState().dutyNumber));
						}
						//
						dispatch(genDrillStats());
						//
						dispatch(appIsLoading(false));
					},1000);
				}
			})
			.catch((error) => {
				//console.log(error)
				location.reload();
				dispatch(appIsLoading(false));
			})
	}
}

export function putDrillCars(data) {
	return { type: types.PUT_DRILL_CARS, data }
}
export function getStationDrillCarsSet() {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const cars = getState().drillCars;
			const stationId = getState().drillStationCurrent.id;
			const carsFiltered = cars.filter(
				car => car.stationId === stationId
			);
			dispatch(putDrillCarsCurrentSet(carsFiltered));
		}
	}
}
export function putDrillCarsCurrentSet(data) {
	return { type: types.PUT_DRILL_CARS_CURRENT_SET, data }
}

export function putDrillAbsentCars(data) {
	return { type: types.PUT_DRILL_ABSENT_CARS, data }
}
export function getStationDrillAbsentCarsSet() {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const data = getState().drillAbsentCars;
			const stationId = getState().drillStationCurrent.id;
			var bool = false;
			data.forEach((entry) => {
				if (entry.id === stationId) {
					bool = true;
					dispatch(putDrillAbsentCarsCurrentSet(entry.cars));
				}
			});
			if (!bool) {
				dispatch(putDrillAbsentCarsCurrentSet([]));
			}
		}
	}
}
export function putDrillAbsentCarsCurrentSet(data) {
	return { type: types.PUT_DRILL_ABSENT_CARS_CURRENT_SET, data }
}

export function putDrillTasksCars(data) {
	return { type: types.PUT_DRILL_TASKS_CARS, data }
}
export function getStationDrillTasksCarsSet() {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const data = getState().drillTasksCars;
			const stationId = getState().drillStationCurrent.id;
			var bool = false;
			data.forEach((entry) => {
				if (entry.id === stationId) {
					bool = true;
					dispatch(putDrillTasksCarsCurrentSet(entry.cars));
				}
			});
			if (!bool) {
				dispatch(putDrillTasksCarsCurrentSet([]));
			}
		}
	}
}
export function putDrillTasksCarsCurrentSet(data) {
	return { type: types.PUT_DRILL_TASKS_CARS_CURRENT_SET, data }
}

const blockCarsViewSample = { notEmpty: false, readyList: [], 
	readyTotal: {number: '', GDZ: 0, OST: 0}, reserve: 	'', repair: '', TO: '', transfered: '', borrowed: ''
}
export function compileDrillCarsBlockView() {
	return (dispatch, getState) => {
		var blockCarsView = {
			main:	JSON.parse(JSON.stringify(blockCarsViewSample)),
			spec: JSON.parse(JSON.stringify(blockCarsViewSample)),
			extra:JSON.parse(JSON.stringify(blockCarsViewSample))
		}
		// получить машины текущей ПЧ
		var carsFiltered = JSON.parse(JSON.stringify(getState().drillCarsCurrentSet))
		// пометить машины Ремонт ТО Переброска
		const drillAbsentCars = getState().drillAbsentCarsCurrentSet;
		drillAbsentCars.forEach((entry) => {
			if (carsFiltered.length === 0) {
				var entry2 = JSON.parse(JSON.stringify(entry))
				if (entry2.state === 'borrowed') {
					entry2.state = '';
				}
				carsFiltered.push(entry2);
			} else {
				for (var i=0; i<carsFiltered.length; i++) {
					if (entry.id === carsFiltered[i].id && !carsFiltered[i].state) {
						//carsFiltered[i].state = entry.state;
						//carsFiltered[i] = JSON.parse(JSON.stringify(entry));
						carsFiltered[i] = {...carsFiltered[i], ...entry}
						break;
					}
					if (i === carsFiltered.length-1) {
						var entry2 = JSON.parse(JSON.stringify(entry))
						if (entry2.state === 'borrowed') {
							entry2.state = '';
						}
						carsFiltered.push(entry2);
						break;
					}
				}
			}
		});
		// пометить машины на выезде
		const drillTasksCars = getState().drillTasksCarsCurrentSet;
		drillTasksCars.forEach((entry) => {
			if (carsFiltered.length === 0) {
				carsFiltered.push(JSON.parse(JSON.stringify({...{state:'task'}, ...entry})));
			} else {
				for (var i=0; i<carsFiltered.length; i++) {
					if (entry.id === carsFiltered[i].id) {
						carsFiltered[i].state = 'task';
						carsFiltered[i].GDZ 	= entry.GDZ;
						carsFiltered[i].OST 	= entry.OST;
						carsFiltered[i].duty 	= entry.duty;
						break;
					}
					if (i === carsFiltered.length-1) {
						carsFiltered.push(JSON.parse(JSON.stringify({...{state:'task'}, ...entry})));
						break;
					}
				}
			}
		});
		// вывести назначенные в боевой расчет
		const drillDutyCarsCurrentItem = getState().drillDutyCarsCurrentItem;
		drillDutyCarsCurrentItem.cars.forEach((entry) => {
			if (carsFiltered.length === 0) {
				carsFiltered.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
			} else {
				for (var i=0; i<carsFiltered.length; i++) {
					if (entry.id === carsFiltered[i].id) {
						if (!carsFiltered[i].state) {
							carsFiltered[i].state = 'base';
							carsFiltered[i].GDZ 	= entry.GDZ;
							carsFiltered[i].OST 	= entry.OST;
							carsFiltered[i].duty 	= getState().dutyNumber;
						}
						break;
					}
					if (i === carsFiltered.length-1) {
						carsFiltered.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
						break;
					}
				}
			}
		});
		// собрать данные для просмотра 
		carsFiltered.forEach((car) => {
			blockCarsView[car.type].notEmpty = true;
			switch (car.state) {
				case 'base':
				case 'task':
					blockCarsView[car.type].readyList.push({
						state: 			car.state, 	
						bortNomer:	car.bortNomer, 
						name: 			car.name, 
						GDZ: 				car.GDZ, 
						OST: 				car.OST, 
						duty: 			car.duty
					});
					blockCarsView[car.type].readyTotal.number 
																		+= blockCarsView[car.type].readyTotal.number === '' 
																		? car.bortNomer : ', ' + car.bortNomer;
					blockCarsView[car.type].readyTotal.GDZ += car.GDZ;
					blockCarsView[car.type].readyTotal.OST += car.OST;
					break;
				case 'repair':
					blockCarsView[car.type].repair += blockCarsView[car.type].repair === '' 
																						? car.bortNomer : ', ' + car.bortNomer;
					break;
				case 'TO':
					blockCarsView[car.type].TO += blockCarsView[car.type].TO === '' 
																				? car.bortNomer : ', ' + car.bortNomer;
					break;
				case 'transfered':
					blockCarsView[car.type].transfered += blockCarsView[car.type].transfered === '' 
																						? car.bortNomer : ', ' + car.bortNomer;
					break;
				default:
					blockCarsView[car.type].reserve += blockCarsView[car.type].reserve === '' 
																						? car.bortNomer : ', ' + car.bortNomer;
			}
		});
		dispatch(putDrillCarsBlockView(blockCarsView));
		// собрать данные для редатора 
		var blockCarsEdit = { main:	[], spec: [], extra:[] }
		var dutyNumber = getState().dutyNumber;
		carsFiltered.forEach((car) => {
			if (car.duty && car.duty !== dutyNumber) {return}
			var item = {
				id:					car.id,
				name:				car.name,
				bortNomer:	car.bortNomer,
				gosNomer:		car.gosNomer,
				state:			(car.state ? car.state : ''),
				GDZ:				(car.GDZ ? car.GDZ : 0),
				OST:				(car.OST ? car.OST : 0),
				duty:				(car.duty ? car.duty : dutyNumber),
				stationName:(car.stationName ? car.stationName : ''),
				stationId:	(car.stationId ? car.stationId : '')
			}
			const absentCars = getState().drillAbsentCarsCurrentSet;
			for (var i=0; i<absentCars.length; i++) {
				if (car.id === absentCars[i].id && absentCars[i].state === 'borrowed') {
					item.borrowed = true;
				}
			}
			blockCarsEdit[car.type].push(item);
		});
		dispatch(putDrillCarsBlockEdit(blockCarsEdit));
	}
}
export function genDrillCarsBlockEditStaffBusy() {
	return(dispatch,getState) => {
		var data = getState().drillCarsBlockEdit;
		var GDZ = 0;
		var OST = 0;
		for (var key in data) {
			data[key].forEach((entry) => {
				GDZ += parseInt(entry.GDZ);
				OST += parseInt(entry.OST);
			});
		}
		var result = {GDZ:GDZ,OST:OST};
		dispatch(putDrillCarsBlockEditStaffBusy(result));
	}
}
export function putDrillCarsBlockEditStaffBusy(data) {
	return { type: types.PUT_DRILL_CARS_BLOCK_EDIT_STAFF_BUSY, data }
}
export function putDrillCarsBlockView(data) {
	return { type: types.PUT_DRILL_CARS_BLOCK_VIEW, data }
}
export function putDrillCarsBlockEdit(data) {
	return { type: types.PUT_DRILL_CARS_BLOCK_EDIT, data }
}
export function putDrillCarEditItem(type, data) {
	return (dispatch, getState) => {
		var block = JSON.parse(JSON.stringify(getState().drillCarsBlockEdit[type]));
		block.forEach((item) => {
			if (item.state === 'task') 				{ return }
			if (item.id !== data.id) 					{ return }
			if (data.state !== undefined) 		{ item.state = data.state}
			if (data.GDZ !== undefined) 			{ item.GDZ = data.GDZ}
			if (data.OST !== undefined) 			{ item.OST = data.OST}
			if (data.stationId !== undefined) { item.stationId = data.stationId}
			if (data.toReturn !== undefined) 	{ item.toReturn = data.toReturn}
			dispatch(putDrillCarsEditItemToSave(item))
		});
		var result = {}; 
		result[type] = JSON.parse(JSON.stringify(block));
		dispatch(putDrillCarsBlockEditSingle(result));
	}
}
export function putDrillCarsBlockEditSingle(data) {
	return { type: types.PUT_DRILL_CARS_BLOCK_EDIT_SINGLE, data }
}
export function putDrillCarsEditItemToSave(item) {
	return { type: types.PUT_DRILL_CARS_EDIT_ITEM_TO_SAVE, item }
}
export function putDrillCarsEditItemToSaveEmpty() {
	return { type: types.PUT_DRILL_CARS_EDIT_ITEM_TO_SAVE_EMPTY, item: [] }
}

export function saveDrillCars(url,type) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		var ready = true;
		var record = {
			id: getState().drillStationCurrent.id,
			index: 	getState().drillStationCurrent.index,
			type: type,
			items: getState().drillCarsEditItemsToSave
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
					dispatch(putDrillDutiesCars(value.drillDutiesCars));
					dispatch(putDrillAbsentCars(value.drillAbsentCars));
					dispatch(putTasksDrillData(value.tasksDrillData));
					dispatch(genTasksDrillCombatCars());
					setTimeout(() => {
						dispatch(getStationDutySet(getState().drillStationCurrent.id));
						dispatch(getStationDutyItem(getState().dutyNumber));
						dispatch(getStationDutyCarsSet(getState().drillStationCurrent.id));
						dispatch(getStationDutyCarsItem(getState().dutyNumber));						
						dispatch(getStationDrillCarsSet());
						dispatch(getStationDrillAbsentCarsSet());
						dispatch(getStationDrillTasksCarsSet());
						dispatch(compileDrillCarsBlockView());
						dispatch(putDrillCarsEditItemToSaveEmpty());
						if (value.drillLastSave) {
							dispatch(putDrillLastSave(value.drillLastSave));
							dispatch(genStationsLastSaveFlag());
							dispatch(getStationLastSaveSet(getState().drillStationCurrent.id));
							dispatch(genDrillSaveFlagsCurrentSet(getState().dutyNumber));
						}
						//
						dispatch(genDrillStats());
						//
						dispatch(appIsLoading(false));
					},1000);
				}
			})
			.catch((error) => {
				console.log(error)
				//location.reload();
				dispatch(appIsLoading(false));
			})
	}
}

export function putDrillSupply(data) {
	return { type: types.PUT_DRILL_SUPPLY, data }
}
export function getStationSupplySet() {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const items = getState().drillSupply;
			const stationId = getState().drillStationCurrent.id;
			for (var i=0; i<items.length; i++) {
				if (items[i].id === stationId) {
					dispatch(putDrillSupplySet(items[i]));
					break;
				}
				if (i === items.length - 1) {
					dispatch(putDrillSupplySetInit());
				}
			}
		}
	}
}
export function putDrillSupplySet(data) {
	return { type: types.PUT_DRILL_SUPPLY_SET, data }
}
export function putDrillSupplySetEdit(data) {
	return { type: types.PUT_DRILL_SUPPLY_SET_EDIT, data }
}
export function putDrillSupplySetInit() {
	return { type: types.PUT_DRILL_SUPPLY_SET_INIT, data:{} }
}

export function saveDrillSupply(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		var ready = true;
		var record = {
			id: 		getState().drillStationCurrent.id,
			name: 	getState().drillStationCurrent.name,
			index: 	getState().drillStationCurrent.index,
			data:		getState().drillSupplySet
		};
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
					dispatch(putDrillSupply(value.drillSupply));
					dispatch(putTasksDrillData(value.tasksDrillData));
					dispatch(genTasksDrillCombatCars());
					setTimeout(() => {
						dispatch(getStationSupplySet(getState().drillStationCurrent.id));
						if (value.drillLastSave) {
							dispatch(putDrillLastSave(value.drillLastSave));
							dispatch(genStationsLastSaveFlag());
							dispatch(getStationLastSaveSet(getState().drillStationCurrent.id));
							dispatch(genDrillSaveFlagsCurrentSet(getState().dutyNumber));
						}
						dispatch(appIsLoading(false));
					},1000);
				}
			})
			.catch((error) => {
				//console.log(error)
				location.reload();
				dispatch(appIsLoading(false));
			})
	}
}

export function putDrillMainStaff(data) {
	return { type: types.PUT_DRILL_MAIN_STAFF, data }
}
const mainStaffSet = {total: 0, vacation: 0, illness: 0, missionOut: 0, missionIn: 0, otherOut: 0, 
									vacant: 0, present: 0, onDuty: 0, dispatchers: 0, notPrepared: 0, 
									combatTotal: 0, combatGDZ: 0, combatOther: 0}
const stationMainStaffSet = {id:'',name:'', duty01: mainStaffSet, duty02: mainStaffSet, 
																				duty03: mainStaffSet,duty04: mainStaffSet}
export function getStationMainStaffSet(stationId) {
	return (dispatch, getState) => {
		const duties = getState().drillMainStaff;
		var empty = true;
		duties.forEach(function(entry) {
			if (entry.id === stationId) {
				empty = false;
				dispatch(putDrillMainStaffCurrentSet(entry))
			}
		});
		if (empty) {
			var emptySet = stationMainStaffSet;
			emptySet.id = stationId;
			dispatch(putDrillMainStaffCurrentSet(emptySet))
		}
	}
}
export function putDrillMainStaffCurrentSet(data) {
	return { type: types.PUT_DRILL_MAIN_STAFF_CURRENT_SET, data }
}
export function getStationMainStaffItem(index) {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const mainStaffCurrentSet = getState().drillMainStaffCurrentSet;
			const mainStaffItem = mainStaffCurrentSet['duty0' + index]
			if (mainStaffItem) {
				dispatch(putDrillMainStaffCurrentItem(mainStaffItem))
			} else {
				dispatch(putDrillDutyCurrentItem(mainStaffSet))
			}
		}
	}
}
export function putDrillMainStaffCurrentItem(data) {
	return { type: types.PUT_DRILL_MAIN_STAFF_CURRENT_ITEM, data }
}

export function saveDrillMainStaff(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		var ready = true;
		var record = {
			id: 		getState().drillStationCurrent.id,
			name: 	getState().drillStationCurrent.name,
			index: 	getState().drillStationCurrent.index,
			duty:		'duty0' + getState().dutyNumber,
			item: 	getState().drillMainStaffCurrentItem
		};
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
					dispatch(putDrillMainStaff(value.drillMainStaff));
					dispatch(putTasksDrillData(value.tasksDrillData));
					dispatch(genTasksDrillCombatCars());
					setTimeout(() => {
						dispatch(getStationMainStaffSet(getState().drillStationCurrent.id));
						dispatch(getStationMainStaffItem(getState().dutyNumber));
						if (value.drillLastSave) {
							dispatch(putDrillLastSave(value.drillLastSave));
							dispatch(genStationsLastSaveFlag());
							dispatch(getStationLastSaveSet(getState().drillStationCurrent.id));
							dispatch(genDrillSaveFlagsCurrentSet(getState().dutyNumber));
						}
						dispatch(appIsLoading(false));
					},1000);
				}
			})
			.catch((error) => {
				location.reload();
				dispatch(appIsLoading(false));
			})
	}
}

export function putDrillLastSave(data) {
	return { type: types.PUT_DRILL_LAST_SAVE, data }
}
export function genStationsLastSaveFlag() {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const items = getState().drillLastSave;
			const duty = getState().dutyNumber;
			const day = getState().workDay
			var item = {}
			var flags = {}
			for (var i=0; i<items.length; i++) {
				item = {
					global: 		false, 
					staff: 			false, 
					cars: 			{ main: false, spec: false, extra: false }, 
					supply: 		false, 
					mainStaff: 	false
				}
				if (items[i].staff) {
					if (items[i].staff.duty === duty && items[i].staff.date === day) {
						item.staff = true;
					}
				}
				if (items[i].cars) {
					if (items[i].cars.main.duty === duty && items[i].cars.main.date === day) {
						item.cars.main = true;
					}
					if (items[i].cars.spec.duty === duty && items[i].cars.spec.date === day) {
						item.cars.spec = true;
					}
					if (items[i].cars.extra.duty === duty && items[i].cars.extra.date === day) {
						item.cars.extra = true;
					}
				}
				if (items[i].supply) {
					if (items[i].supply.duty === duty && items[i].supply.date === day) {
						item.supply = true;
					}
				}
				if (items[i].mainStaff) {
					if (items[i].mainStaff.duty === duty && items[i].mainStaff.date === day) {
						item.mainStaff = true;
					}
				}
				item.global = item.staff && item.supply && item.mainStaff &&
											(item.cars.main && item.cars.spec && item.cars.extra);
				flags[items[i].id] = item.global;
			}
			dispatch(putDrillLastSaveFlagGlobal(flags));
		} else {
			dispatch(putDrillLastSaveFlagGlobal({}));
		}
	}
}
export function putDrillLastSaveFlagGlobal(data) {
	return { type: types.PUT_DRILL_LAST_SAVE_FLAG_GLOBAL, data }
}
export function getStationLastSaveSet() {
	return (dispatch, getState) => {
		if (getState().drillStations.length > 0) {
			const items = getState().drillLastSave;
			const stationId = getState().drillStationCurrent.id;
			for (var i=0; i<items.length; i++) {
				if (items[i].id === stationId) {
					dispatch(putDrillLastSaveCurrentSet(items[i]));
					break;
				}
				if (i === items.length - 1) {
					dispatch(putDrillLastSaveCurrentSet({
						global: false, 
						staff: false, 
						cars: {main: false, spec: false, extra: false}, 
						supply: false, 
						mainStaff: false
					}));
				}
			}
		}
	}
}
export function putDrillLastSaveCurrentSet(data) {
	return { type: types.PUT_DRILL_LAST_SAVE_CURRENT_SET, data }
}
export function genDrillSaveFlagsCurrentSet() {
	return (dispatch, getState) => {
		const lastSave = getState().drillLastSaveCurrentSet;
		const item = {
			global: false, 
			staff: false, 
			cars: {main: false, spec: false, extra: false}, 
			supply: false, 
			mainStaff: false
		}
		const duty = getState().dutyNumber;
		const day = getState().workDay
		if (lastSave.staff) {
			if (lastSave.staff.duty === duty && lastSave.staff.date === day) {
				item.staff = true;
			}
		}
		if (lastSave.cars) {
			if (lastSave.cars.main.duty === duty && lastSave.cars.main.date === day) {
				item.cars.main = true;
			}
			if (lastSave.cars.spec.duty === duty && lastSave.cars.spec.date === day) {
				item.cars.spec = true;
			}
			if (lastSave.cars.extra.duty === duty && lastSave.cars.extra.date === day) {
				item.cars.extra = true;
			}
		}
		if (lastSave.supply) {
			if (lastSave.supply.duty === duty && lastSave.supply.date === day) {
				item.supply = true;
			}
		}
		if (lastSave.mainStaff) {
			if (lastSave.mainStaff.duty === duty && lastSave.mainStaff.date === day) {
				item.mainStaff = true;
			}
		}
		item.global = item.staff && item.supply && item.mainStaff &&
									(item.cars.main && item.cars.spec && item.cars.extra);
		dispatch(putDrillSaveFlagsCurrentSet(item));
	}
}
export function putDrillSaveFlagsCurrentSet(data) {
	return { type: types.PUT_DRILL_SAVE_FLAGS_CURRENT_SET, data }
}