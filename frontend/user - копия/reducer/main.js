
import * as types from '../constants/ActionTypes'

export function appHasErrored(state = false, action) {
	switch (action.type) {
		case types.APP_HAS_ERRORED:
			return action.hasErrored;
		default:
			return state;
	}
}
export function appIsLoading(state = false, action) {
	switch (action.type) {
		case types.APP_IS_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}
export function user(state = {name:'', iin:''}, action) {
	switch (action.type) {
		case types.APP_USER:
			return action.user;
		default:
			return state;
	}
}

export function callcenters(state = [], action) {
	switch (action.type) {
		case types.PUT_CALLCENTERS:
			return action.data;
		default:
			return state;
	}
}

export function stations(state = [], action) {
	switch (action.type) {
		case types.PUT_STATIONS:
			return action.data;
		default:
			return state;
	}
}

export function currentDateTime(state = '', action) {
	switch (action.type) {
		case types.CURRENT_DATE_TIME:
			return action.value;
		default:
			return state;
	}
}
export function currentDateTimeClear(state = '', action) {
	switch (action.type) {
		case types.CURRENT_DATE_TIME_CLEAR:
			return action.value;
		default:
			return state;
	}
}
export function workDay(state = '', action) {
	switch (action.type) {
		case types.CURRENT_WORK_DAY:
			return action.value;
		default:
			return state;
	}
}
export function dutyNumber(state = 0, action) {
	switch (action.type) {
		case types.CURRENT_DUTY_NUMBER:
			return action.value;
		default:
			return state;
	}
}

export function appMode(state = 'main', action) {
	switch (action.type) {
		case types.PUT_APP_MODE:
			return action.value;
		default:
			return state;
	}
}
