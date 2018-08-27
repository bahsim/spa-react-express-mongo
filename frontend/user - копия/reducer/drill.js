
import * as types from '../constants/ActionTypes'

const generalStat = {
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
export function drillStats(state = generalStat, action) {
	switch (action.type) {
		case types.PUT_DRILL_STATS:
			return action.data;
		default:
			return state;
	}
}

export function drillStations(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_STATIONS:
			return action.data;
		default:
			return state;
	}
}
export function drillStationCurrent(state = {}, action) {
	switch (action.type) {
		case types.SELECT_DRILL_STATION:
			return action.item;
		default:
			return state;
	}
}
export function drillStationCurrentFlag(state = false, action) {
	switch (action.type) {
		case types.SELECT_DRILL_STATION_FLAG:
			return action.value;
		default:
			return state;
	}
}

function dutyItemInit() {
	return {
		total: 				0,
		vacation: 		0,
		illness: 			0,
		missionOut: 	0,
		missionIn: 		0,
		otherOut: 		0,
		vacant: 			0,
		present: 			0, 
		onDuty: 			0,
		dispatchers: 	0,
		notPrepared:	0,
		combatTotal: 	0, 
		combatGDZ:		0,
		combatOther: 	0
	}
}
export function drillDuties(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_DUTIES:
			return action.data;
		default:
			return state;
	}
}
export function drillDutyCurrentSet(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_DUTY_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}
export function drillDutyCurrentItem(state = dutyItemInit(), action) {
	switch (action.type) {
		case types.PUT_DRILL_DUTY_CURRENT_ITEM:
			return action.data;
		default:
			return state;
	}
}

export function drillDutiesCars(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_DUTIES_CARS:
			return action.data;
		default:
			return state;
	}
}
export function drillDutyCarsCurrentSet(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_DUTY_CARS_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}
export function drillDutyCarsCurrentItem(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_DUTY_CARS_CURRENT_ITEM:
			return action.data;
		default:
			return state;
	}
}

export function drillCars(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_CARS:
			return action.data;
		default:
			return state;
	}
}
export function drillCarsCurrentSet(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_CARS_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}

export function drillAbsentCars(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_ABSENT_CARS:
			return action.data;
		default:
			return state;
	}
}
export function drillAbsentCarsCurrentSet(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_ABSENT_CARS_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}

export function drillTasksCars(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_TASKS_CARS:
			return action.data;
		default:
			return state;
	}
}
export function drillTasksCarsCurrentSet(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_TASKS_CARS_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}

const blockCarsViewSampleMain = {
	notEmpty: true,
	readyList: [
		{ state: 'base', 	bortNomer: '1', name: 'АЦ-40-433362', GDZ: '5', OST: '1' , duty: 3},
		{ state: 'task', 	bortNomer: '2', name: 'АЦ-40-4331', 	GDZ: '4', OST: '2' , duty: 2},
		{ state: 'base', 	bortNomer: '3', name: 'АЦ-40-4331', 	GDZ: '3', OST: '1' , duty: 3},
	],
	readyTotal: {number: '1, 2, 3', GDZ: '12', OST: '4'},
	reserve: 	'5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 18',
	repair: 	'9, 10',
	TO: 			'11, 12, 13',
	transfer: '14, 15, 16'
}
const blockCarsViewRecordSample = { notEmpty: false, readyList: [], 
	readyTotal: {number: '', GDZ: 0, OST: 0}, reserve: 	'', repair: '', TO: '', transfer: ''
}
const blockCarsViewSample = {
	main:  blockCarsViewRecordSample,
	spec:  blockCarsViewRecordSample,
	extra: blockCarsViewRecordSample
}
export function drillCarsBlockView(state = blockCarsViewSample, action) {
	switch (action.type) {
		case types.PUT_DRILL_CARS_BLOCK_VIEW:
			return action.data;
		default:
			return state;
	}
}
export function drillCarsBlockEditStaffBusy(state = {GDZ:0,OST:0}, action) {
	switch (action.type) {
		case types.PUT_DRILL_CARS_BLOCK_EDIT_STAFF_BUSY:
			return action.data;
		default:
			return state;
	}
}
const blockCarsEditSample = {main:[],spec:[],extra:[]}
export function drillCarsBlockEdit(state = blockCarsEditSample, action) {
	switch (action.type) {
		case types.PUT_DRILL_CARS_BLOCK_EDIT:
			return action.data;
		case types.PUT_DRILL_CARS_BLOCK_EDIT_SINGLE:
			return {...state, ...action.data}
		default:
			return state;
	}
}
export function drillCarsEditItemsToSave(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_CARS_EDIT_ITEM_TO_SAVE:
			if (state.length === 0) {
				return [ {...action.item} ]
			} else {
				var bool = false;
				const newState = state.map(item => {
					if (item.id === action.item.id) {
						bool = true
						return { ...item, ...action.item }
					}
					return item;
				})
				return bool ? newState : [ ...newState, {...action.item}]
			}
		case types.PUT_DRILL_CARS_EDIT_ITEM_TO_SAVE_EMPTY:
			return action.item;
		default:
			return state;
	}
}

export function drillSupply(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_SUPPLY:
			return action.data;
		default:
			return state;
	}
}
const drillSupplyInit = { 
	id: '', 
	name: '', 
	gsm: { 
		benzin: { combat: 0, reserve: 0, repair: 0, store: 0 },
		dizel: 	{ combat: 0, reserve: 0, repair: 0, store: 0 }
	},
	pena: {  combat: 0, reserve: 0 },
	sizod: { combat: 0, reserve: 0, base: 0 }
}
export function drillSupplySet(state = drillSupplyInit, action) {
	switch (action.type) {
		case types.PUT_DRILL_SUPPLY_SET_INIT:
			return {...drillSupplyInit}
		case types.PUT_DRILL_SUPPLY_SET:
			return action.data;
		case types.PUT_DRILL_SUPPLY_SET_EDIT:
			return {...state, ...action.data};
		default:
			return state;
	}
}

function mainStaffItemInit() {
	return { manager: '', dispatcher: '', onDuty: '' }
}
export function drillMainStaff(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_MAIN_STAFF:
			return action.data;
		default:
			return state;
	}
}
export function drillMainStaffCurrentSet(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_MAIN_STAFF_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}
export function drillMainStaffCurrentItem(state = mainStaffItemInit(), action) {
	switch (action.type) {
		case types.PUT_DRILL_MAIN_STAFF_CURRENT_ITEM:
			return action.data;
		default:
			return state;
	}
}

export function drillLastSave(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_LAST_SAVE:
			return action.data;
		default:
			return state;
	}
}
export function drillLastSaveFlagGlobal(state = [], action) {
	switch (action.type) {
		case types.PUT_DRILL_LAST_SAVE_FLAG_GLOBAL:
			return action.data;
		default:
			return state;
	}
}
export function drillLastSaveCurrentSet(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_LAST_SAVE_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}
export function drillSaveFlagsCurrentSet(state = {}, action) {
	switch (action.type) {
		case types.PUT_DRILL_SAVE_FLAGS_CURRENT_SET:
			return action.data;
		default:
			return state;
	}
}
