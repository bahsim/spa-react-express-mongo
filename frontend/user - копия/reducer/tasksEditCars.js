
import * as types from '../constants/ActionTypes'

const carInit = () => {
	return {
		id: 				'',
		stationName:'',
		stationId:	'',
		bortNomer: 	'',
		name: 			'',
		gosNomer: 	'',
		type: 			'',
		typeView: 	'',
		GDZ: 				0,
		OST: 				0,
		time1: 			'',
		time2: 			'',
		time3: 			'',
		time4: 			''
	}
}

export function tasksDrillCombatCars(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_DRILL_COMBAT_CARS:
			return action.value
		default:
			return state;
	}
}
export function tasksBusyCars(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_BUSY_CARS:
			return action.value
		default:
			return state;
	}
}
export function tasksCombatCarsSelect(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_COMBAT_CARS_SELECT:
			return action.value
		case types.CHECK_TASKS_COMBAT_CARS_SELECTED:
			return state.map((item) => {
				if (item.id === action.value) {
					return {...item, ...{selected: !item.selected}}
				}
				return item;
			});
		default:
			return state;
	}
}

export function tasksCombatCarsRegistry(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_COMBAT_CARS_REGISTRY:
			return action.value
		default:
			return state;
	}
}

export function tasksFormEditCarsCombatItem(state = carInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_CARS_COMBAT_ITEM:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_CARS_COMBAT_ITEM_INIT:
			return statsInit()
		case types.REFRESH_TASKS_FORM_EDIT_CARS_COMBAT_ITEM:
			return { ...state, ...action.value }
		default:
			return state;
	}
}

export function tasksCombatCarsGroupEdit(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_COMBAT_CARS_GROUP_EDIT:
			return action.value
		case types.REFRESH_TASKS_COMBAT_CARS_GROUP_EDIT:
			return state.map((item) => {
				if (item.id === action.id) {
					switch (action.field) {
						case 'time1': return {...item, ...{time1: action.value}}
						case 'time2': return {...item, ...{time2: action.value}}
						case 'time3': return {...item, ...{time3: action.value}}
						case 'time4': return {...item, ...{time4: action.value}}
					}
					return item
				}
				return item;
			});
		default:
			return state;
	}
}
export function tasksCombatCarsGroupEditField(state = '', action) {
	switch (action.type) {
		case types.PUT_TASKS_COMBAT_CARS_GROUP_EDIT_FIELD:
			return action.value
		default:
			return state;
	}
}
