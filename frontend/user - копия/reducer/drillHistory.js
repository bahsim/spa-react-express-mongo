
import * as types from '../constants/ActionTypes'

const blockCarsViewInit 	= () => {
	return {
		notEmpty: false, readyList: [], 
		readyTotal: {number: '', GDZ: 0, OST: 0}, 
		reserve: 	'', repair: '', TO: '', transfered: '', borrowed: ''
	}
}
const blockDutyInit 			= () => {
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
const generalStatInit 		= () => {
	return {
		fireStationsCount: 	{ basic: 0, other: 0 },
		personnelCount: 		{ basic: 0, other: 0 },
		personnelGDZCount: 	{ basic: 0, other: 0 },
		carsMain: 					{ basic: 0, other: 0 },
		carsSpec: 					{ basic: 0, other: 0 },
		carsExtra: 					{ basic: 0, other: 0 },
		reserveCarsMain: 		{ basic: 0, other: 0 },
		reserveCarsSpec: 		{ basic: 0, other: 0 },
		reserveCarsExtra: 	{ basic: 0, other: 0 }	
	}
}

export function drillHistoryDutyNumber(state = '0', action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_DUTY_NUMBER:
			return action.value
		default:
			return state;
	}
}
export function drillHistoryDutyWorkDay(state = '', action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_DUTY_WORK_DAY:
			return action.value
		default:
			return state;
	}
}

export function drillHistoryStations(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_STATIONS:
			return action.data;
		default:
			return state;
	}
}
export function drillHistoryStation(state = {}, action) {
	switch (action.type) {
		case types.SELECT_DRILL_HISTORY_STATION:
			return action.item;
		default:
			return state;
	}
}
export function drillHistoryStationFlag(state = false, action) {
	switch (action.type) {
		case types.SELECT_DRILL_HISTORY_STATION_FLAG:
			return action.value;
		default:
			return state;
	}
}

export function drillHistoryStats(state = generalStatInit(), action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_STATS:
			return action.data;
		default:
			return state;
	}
}

export function drillHistoryDataSet(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_DATASET:
			return action.data;
		default:
			return state;
	}
}

export function drillHistoryDataSetStation(state = blockViewInit(), action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_DATASET_STATION:
			return action.data;
		default:
			return state;
	}
}

export function drillHistoryCarsBlockView(state = { main:	blockCarsViewInit(), 
																										spec: blockCarsViewInit(), 
																										extra:blockCarsViewInit()}, action) {
	switch (action.type) {
		case types.PUT_DRILL_HISTORY_CARS_BLOCK_VIEW:
			return action.data;
		default:
			return state;
	}
}
