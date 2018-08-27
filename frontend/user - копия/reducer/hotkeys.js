
import * as types from '../constants/ActionTypes'

export function userForm(state = 'main', action) {
	switch (action.type) {
		case types.PUT_USER_FORM:
			return action.data;
		default:
			return state;
	}
}
