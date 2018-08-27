
import * as types from '../constants/ActionTypes'

const formEditInit = () => {
	return {
		//
		date: '2018-01-01',
		time: '00:01',
		type: 'call101', //atc, call101
		typeView: 'звонок на 101', //сигнал АТЦ, звонок на 101
		//
		signalAtc: 	signalAtcInit(),
		caller: 		callerInit(),
		place: 			placeInit(),
		cause: 			causeInit(),
		extraInfo: 	extraInfoInit(),
		//
		stats: statsInit(),
		cars: [],
		history: [],
		//
		done: false
	}
}

const signalAtcInit = () => {
	return {
		signal: 			'kamal',
		signalView: 	'КАМАЛ',
		organization: ''
	}
}

const callerInit = () => {
	return {
		firstname: '',
		surname: '',
		middlename: '',
		post: '',
		telephone: '',
		adress: ''
	}
}

const placeInit = () => {
	return {
		region: 	'',
		type: 		'urban',
		typeView: 'в населенном пункте',
		note: 		'',
		town: 		'',
		street: 	'',
		number: 	''
	}
}

const causeInit =  () => {
	return {
		type: 				'fire',
		typeView: 		'пожар',
		subtype: 			'common',
		subtypeView: 	'бытовой',
		note: ''
	}
}

const tasksTypesInit = () => {
	return [
		{id: 'fire', 						name: 'пожар'},
		{id: 'ERW', 						name: 'АСР'},
		{id: 'shortCutCircuit', name: 'КЗ'},
		{id: 'garbage', 				name: 'мусор'},
		{id: 'burnedFood', 			name: 'подгорание пищи'},
		{id: 'herbage', 				name: 'травостой'},
		{id: 'falseCall', 			name: 'вызов ложный'}
	]
};

const tasksSubTypesInit = (value) => {
	const items =	{
		fire: [
			{id: 'common', 			name: 'бытовой', subs: []},
			{id: 'transport', 	name: 'транспортный', subs: []},
			{id: 'industrial', 	name: 'производственный', subs: []},
			{id: 'forest', 			name: 'лесной', subs: []},
			{id: 'steppe', 			name: 'степной', subs: []},
			{id: 'other', 			name: 'прочий', subs: []}
		],
		ERW: [
			{id: 'entryForPolice', 	name: 'открытие двери', subs: []},				
			{id: 'towage', 					name: 'буксировка', subs: []},
			{id: 'evacuation', 			name: 'эвакуация людей', subs: []},
			{id: 'smokeExhaust', 		name: 'дымоудаление', subs: []},
			{id: 'roadAccidents', 	name: 'при ДТП', subs: []},
			{id: 'thawedWaters', 		name: 'откачка талых вод', subs: []}
		],
		shortCutCircuit: [
			{id: 'transport', 	name: 'транспорт', subs: []},
			{id: 'switchboard', name: 'электрощитовая', subs: []},
			{id: 'other', 			name: 'прочее', subs: []}
		],
		garbage: [],
		burnedFood: [],
		herbage: [],
		falseCall: []
	}
	return items[value];
};

const extraInfoInit = () => {
	return {
		objectType: 		'living', //living,store, nearby
		objectTypeView:	'жилой дом', //жилой дом, хоз.постройка, поблизости
		height: 				1,
		totalHeight: 		1,
		threatToHuman: 	false,
		threatToHumanView: 	'нет', //да, нет
	}
}

const statsInit = () => {
	return {
		localization: '',
		liquidation:	''
	}
}

export function tasksFormEdit(state = formEditInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT:
			return action.value
		default:
			return state;
	}
}

export function tasksFormEditCallcenterId(state = '', action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_CALLCENTER_ID:
			return action.value
		default:
			return state;
	}
}
export function tasksFormEditStationId(state = '', action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_STATION_ID:
			return action.value
		default:
			return state;
	}
}

export function tasksFormEditDate(state = '2018-01-01', action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_DATE:
			return action.value
		default:
			return state;
	}
}

export function tasksFormEditTime(state = '00:01', action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_TIME:
			return action.value
		default:
			return state;
	}
}

export function tasksFormEditCaller(state = callerInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_CALLER:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_CALLER_INIT:
			return callerInit()
		default:
			return state;
	}
}

export function tasksFormEditPlace(state = placeInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_PLACE:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_PLACE_INIT:
			return placeInit()
		case types.REFRESH_TASKS_FORM_EDIT_PLACE:
			return { ...state, ...action.value }
		default:
			return state;
	}
}

export function tasksFormEditCause(state = causeInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_CAUSE:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_CAUSE_INIT:
			return causeInit()
		case types.REFRESH_TASKS_FORM_EDIT_CAUSE:
			return { ...state, ...action.value }
		default:
			return state;
	}
}
export function tasksTypes(state = tasksTypesInit(), action) {
	switch (action.type) {
		default:
			return state;
	}
}
export function tasksSubTypes(state = tasksSubTypesInit('fire'), action) {
	switch (action.type) {
		case types.PUT_TASKS_SUB_TYPES:
			return tasksSubTypesInit(action.value);
		default:
			return state;
	}
}

export function tasksFormEditExtraInfo(state = extraInfoInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_EXTRA_INFO:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_EXTRA_INFO_INIT:
			return extraInfoInit()
		case types.REFRESH_TASKS_FORM_EDIT_EXTRA_INFO:
			return { ...state, ...action.value }
		default:
			return state;
	}
}

export function tasksFormEditStats(state = statsInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_STATS:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_STATS_INIT:
			return statsInit()
		case types.REFRESH_TASKS_FORM_EDIT_STATS:
			return { ...state, ...action.value }
		default:
			return state;
	}
}

export function tasksFormEditSignalAtc(state = signalAtcInit(), action) {
	switch (action.type) {
		case types.PUT_TASKS_FORM_EDIT_SIGNAL_ATC:
			return action.value
		case types.PUT_TASKS_FORM_EDIT_SIGNAL_ATC_INIT:
			return signalAtcInit()
		default:
			return state;
	}
}

export function tasksRecordHeight(state = 0, action) {
	switch (action.type) {
		case types.PUT_TASKS_RECORD_HEIGHT:
			return action.value
		default:
			return state;
	}
}

