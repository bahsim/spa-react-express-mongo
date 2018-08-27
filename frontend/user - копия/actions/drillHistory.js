import store from '../store';
import { appIsLoading } from './main';
import * as types from '../constants/ActionTypes'

const blockCarsViewInit 	= () => {
	return {
		notEmpty: false, readyList: [], 
		readyTotal: {number: '', GDZ: 0, OST: 0}, 
		reserve: 	'', repair: '', TO: '', transfered: '', borrowed: ''
	}
}
const blockDutyInit				= () => {
	return {
		total: '',
    vacation: '',
    illness: '',
    missionOut: '',
    missionIn: '',
    otherOut: '',
    vacant: '',
    present: '',
    onDuty: '',
    dispatchers: '',
    notPrepared: '',
    combatTotal: '',
    combatGDZ: '',
    combatOther: ''
  }
}
const blockSupplyInit 		= () => {
	return {
		gsm: {
			benzin: { combat: 0, reserve: 0, repair: 0, store: 0 },
			dizel: { combat: 0, reserve: 0, repair: 0, store: 0 }
		},
		pena: { combat: 0, reserve: 0 },
		sizod: { combat: 0, reserve: 0, base: 0 }
	}
}
const blockMainStaffInit 	= () => {
	return { manager: '', dispatcher: '', onDuty: '' }
}
const blockViewInit 			= () => {
	return {
		dispatcherIin: 	'',
		dispatcherName: '',
		duty: 					blockDutyInit(),
		supply: 				blockSupplyInit(),
		mainStaff: 			blockMainStaffInit(),
		absentCars: 		[],
		ownCars: 				[],
		dutyCars: 			{ combatGDZbusy: 0, combatOtherBusy: 0, cars: []}
	}
}

export function drillHistoryRefreshData(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		fetch(url, {method: 'GET'})
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
					dispatch(drillHistoryPreLoading(value));
					setTimeout(() => {
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

export function drillHistoryPreLoading(value) {
	return (dispatch, getState) => {
		dispatch(putDrillHistoryStations(value.stations));
		dispatch(putDrillHistoryDataSet(value.mainData));
		dispatch(putDrillHistoryDutyNumber(value.dutyNumber));
		dispatch(genDrillHistoryStats());
		if (getState().drillHistoryStations.length > 0) {
			dispatch(selectDrillHistoryStation(getState().drillHistoryStations[0]));
			dispatch(processDrillHistoryStationSelect());
		}
	}
}

export function processDrillHistoryStationSelect() {
	return (dispatch, getState) => {
		dispatch(getDrillHistoryDataSetStation(getState().drillHistoryStation.id));
		dispatch(selectDrillHistoryStationFlag(true));
		dispatch(compileDrillHistoryCarsBlockView());
	}
}

export function selectDrillHistoryDate() {
	return (dispatch, getState) => {
		dispatch(putDrillHistoryStations([]));
		dispatch(putDrillHistoryDataSet([]));
		dispatch(putDrillHistoryDutyNumber('0'));
		dispatch(genDrillHistoryStats());
		dispatch(selectDrillHistoryStation({}));
		dispatch(getDrillHistoryDataSetStation());
		dispatch(selectDrillHistoryStationFlag(false));
		dispatch(compileDrillHistoryCarsBlockView());
	}
}

export function clearDrillHistoryData() {
	return (dispatch, getState) => {
		dispatch(putDrillHistoryStations([]));
		dispatch(putDrillHistoryDataSet([]));
		dispatch(putDrillHistoryDutyNumber('0'));
		dispatch(putDrillHistoryDutyWorkDay(''));
		dispatch(genDrillHistoryStats());
		dispatch(selectDrillHistoryStation({}));
		dispatch(getDrillHistoryDataSetStation());
		dispatch(selectDrillHistoryStationFlag(false));
		dispatch(compileDrillHistoryCarsBlockView());
	}
}

export function putDrillHistoryDutyNumber(value) {
	return {
		type: types.PUT_DRILL_HISTORY_DUTY_NUMBER, value
	}
}
export function putDrillHistoryDutyWorkDay(value) {
	return {
		type: types.PUT_DRILL_HISTORY_DUTY_WORK_DAY, value
	}
}

export function putDrillHistoryStations(data) {
	return {
		type: types.PUT_DRILL_HISTORY_STATIONS, data
	}
}
export function selectDrillHistoryStation(item) {
	return {
		type: types.SELECT_DRILL_HISTORY_STATION, item
	}
}
export function selectDrillHistoryStationFlag(value) {
	return {
		type: types.SELECT_DRILL_HISTORY_STATION_FLAG, value
	}
}

export function genDrillHistoryStats() {
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
		const stations 		= getState().drillHistoryStations;
		const mainData		= getState().drillHistoryDataSet;
		const dutyNumber 	= getState().drillHistoryDutyNumber;
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
			const dataSet = getState().drillHistoryDataSet;
			let setIndex = -1;
			dataSet.forEach(function(set, index) {
				if (set.id === station.id) {
					setIndex = index;
				}
			});
			if (setIndex == -1) {
				return
			}
			// добавить данные по личному составу
			generalStat.personnelCount[segment] 		+= dataSet[setIndex].duty.combatTotal;
			generalStat.personnelGDZCount[segment]	+= dataSet[setIndex].duty.combatGDZ;
			// получить машины текущей ПЧ
			const carsFiltered1 = JSON.parse(JSON.stringify(dataSet[setIndex].ownCars));
			// пометить машины Ремонт ТО Переброска
			dataSet[setIndex].absentCars.forEach((car) => {
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
			// пометить машины в боевой расчет
			dataSet[setIndex].dutyCars.cars.forEach((entry) => {
				if (carsFiltered1.length === 0) {
					carsFiltered1.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
				} else {
					for (var i=0; i<carsFiltered1.length; i++) {
						if (entry.id === carsFiltered1[i].id && !carsFiltered1[i].state) {
							carsFiltered1[i].state = 'base';
							carsFiltered1[i].GDZ 	= entry.GDZ;
							carsFiltered1[i].OST 	= entry.OST;
							carsFiltered1[i].duty = getState().dutyNumber;
							break;
						}
						if (i === carsFiltered1.length-1) {
							carsFiltered1.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
							break;
						}
					}
				}
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
		dispatch(putDrillHistoryStats(generalStat));
		//
	}
}

export function putDrillHistoryStats(data) {
	return {
		type: types.PUT_DRILL_HISTORY_STATS, data
	}
}

export function putDrillHistoryDataSet(data) {
	return {
		type: types.PUT_DRILL_HISTORY_DATASET, data
	}
}
export function getDrillHistoryDataSetStation(stationId) {
	return (dispatch, getState) => {
		const dataSet = getState().drillHistoryDataSet;
		var empty = true;
		dataSet.forEach(function(entry) {
			if (entry.id === stationId) {
				empty = false;
				dispatch(putDrillHistoryDataSetStation(entry))
			}
		});
		if (empty) {
			dispatch(putDrillHistoryDataSetStation(blockViewInit()))
		}
	}
}
export function putDrillHistoryDataSetStation(data) {
	return {
		type: types.PUT_DRILL_HISTORY_DATASET_STATION, data
	}
}

export function compileDrillHistoryCarsBlockView() {
	return (dispatch, getState) => {
		var blockCarsView = {
			main:	blockCarsViewInit(),
			spec: blockCarsViewInit(),
			extra:blockCarsViewInit()
		}
		// получить машины текущей ПЧ
		//var carsFiltered = [];//JSON.parse(JSON.stringify(getState().drillCarsCurrentSet))
		var carsFiltered = JSON.parse(JSON.stringify(getState().drillHistoryDataSetStation.ownCars))
		// пометить машины Ремонт ТО Переброска
		const drillAbsentCars = getState().drillHistoryDataSetStation.absentCars;
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
		// вывести назначенные в боевой расчет
		const drillDutyCarsCurrentItem = getState().drillHistoryDataSetStation.dutyCars;
		drillDutyCarsCurrentItem.cars.forEach((entry) => {
			if (carsFiltered.length === 0) {
				carsFiltered.push(JSON.parse(JSON.stringify({...{state:'base'}, ...entry})));
			} else {
				for (var i=0; i<carsFiltered.length; i++) {
					if (entry.id === carsFiltered[i].id && !carsFiltered[i].state) {
						carsFiltered[i].state = 'base';
						carsFiltered[i].GDZ 	= entry.GDZ;
						carsFiltered[i].OST 	= entry.OST;
						carsFiltered[i].duty 	= getState().dutyNumber;
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
		dispatch(putDrillHistoryCarsBlockView(blockCarsView));
	}
}
export function putDrillHistoryCarsBlockView(data) {
	return {
		type: types.PUT_DRILL_HISTORY_CARS_BLOCK_VIEW, data
	}
}