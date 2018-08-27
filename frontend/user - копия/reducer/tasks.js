
import * as types from '../constants/ActionTypes'

export function tasksDrillData(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_DRILL_DATA:
			return action.value
		default:
			return state;
	}
}

export function tasksCallcenter(state = {}, action) {
	switch (action.type) {
		case types.SELECT_TASKS_CALLCENTER:
			return action.value
		default:
			return state;
	}
}
export function tasksCallcenterId(state = '', action) {
	switch (action.type) {
		case types.SELECT_TASKS_CALLCENTER_ID:
			return action.value
		default:
			return state;
	}
}
export function tasksCallcenterFlag(state = false, action) {
	switch (action.type) {
		case types.SELECT_TASKS_CALLCENTER_FLAG:
			return action.value
		default:
			return state;
	}
}

export function tasksStations(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_STATIONS:
			return action.value
		default:
			return state;
	}
}
export function tasksStation(state = {}, action) {
	switch (action.type) {
		case types.SELECT_TASKS_STATION:
			return action.value
		default:
			return state;
	}
}
export function tasksStationId(state = '', action) {
	switch (action.type) {
		case types.SELECT_TASKS_STATION_ID:
			return action.value
		default:
			return state;
	}
}
export function tasksStationsListFlag(state = false, action) {
	switch (action.type) {
		case types.PUT_TASKS_STATIONS_LISTS_FLAG:
			return action.value
		default:
			return state;
	}
}
export function tasksStationFlag(state = false, action) {
	switch (action.type) {
		case types.SELECT_TASKS_STATION_FLAG:
			return action.value
		default:
			return state;
	}
}

export function tasksRegistryHeight(state = false, action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_HEIGHT:
			return action.value
		default:
			return state;
	}
}
export function tasksRegistryTab(state = 'current', action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_TAB:
			return action.value
		default:
			return state;
	}
}

export function tasksWindowState(state = 'registry', action) {
	switch (action.type) {
		case types.PUT_TASKS_WINDOW_STATE:
			return action.value
		default:
			return state;
	}
}
export function tasksFormEditState(state = 'edit', action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_STATE:
			return action.value
		default:
			return state;
	}
}
export function tasksFormEditType(state = 'editCall101', action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_TYPE:
			return action.value
		default:
			return state;
	}
}

export function tasksRegistryCurrent(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_CURRENT:
			return action.value;
		default:
			return state;
	}
}
export function tasksRegistryCurrentFiltered(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_CURRENT_FILTERED:
			return action.value;
		default:
			return state;
	}
}

export function tasksRegistryHistory(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_HISTORY:
			return action.value;
		default:
			return state;
	}
}
export function tasksRegistryHistoryFiltered(state = [], action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_HISTORY_FILTERED:
			return action.value;
		default:
			return state;
	}
}

export function tasksRegistryCurrentRecordId(state = '', action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_CURRENT_RECORD_ID:
			return action.value;
		default:
			return state;
	}
}
export function tasksRegistryHistoryRecordId(state = '', action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_HISTORY_RECORD_ID:
			return action.value;
		default:
			return state;
	}
}

export function tasksRegistryHistoryPeriod(state = {start:'',end:''}, action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_HISTORY_PERIOD:
			return action.value;
		default:
			return state;
	}
}
export function tasksRegistryHistoryPeriodLabel(state = 'ВЫБРАТЬ ПЕРИОД', action) {
	switch (action.type) {
		case types.PUT_TASKS_REGISTRY_HISTORY_PERIOD_LABEL:
			return action.value;
		default:
			return state;
	}
}
