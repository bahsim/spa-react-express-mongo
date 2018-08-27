import store from '../store';
import * as types from '../constants/ActionTypes'

export function genTasksDrillCombatCars() {
	return (dispatch, getState) => {
		//
		let data = getState().tasksDrillData;
		let cars = [];
		//
		data.forEach((set) => {
			set.dutyCars.cars.forEach((car) => {
				let item = JSON.parse(JSON.stringify(car));
				let type = '';
				switch (item.type) {
					case 'main': 	type = 'основная'; break;
					case 'spec': 	type = 'специальная'; break;
					case 'extra': type = 'вспомогательная'; break;
				}
				let extra = {
					stationName:	set.name,
					stationId:		set.id,
					typeView: 		type
				}
				item = { ...item, ...extra }
				cars.push(item);
			});
		});
		//
		dispatch(putTasksDrillCombatCars(cars));
		//
	}
}
export function putTasksDrillCombatCars(value) {
	return { type: types.PUT_TASKS_DRILL_COMBAT_CARS, value }
}

export function putTasksBusyCars(value) {
	return { 
		type: types.PUT_TASKS_BUSY_CARS, value
	}
}

export function genTasksCombatCarsSelect() {
	return (dispatch, getState) => {
		//
		let carsCombat = JSON.parse(JSON.stringify(getState().tasksDrillCombatCars));
		let carsBusy = getState().tasksBusyCars;
		let carsSelect = []
		//
		carsCombat.forEach((car) => {
			let busy = false;
			carsBusy.forEach((carB) => {
				if (car.id === carB.id) busy = true;
			});
			if (busy) return;
			car.selected = false;
			carsSelect.push(car);
		});
		//
		dispatch(putTasksCombatCarsSelect(carsSelect));
		//
	}
}
export function putTasksCombatCarsSelect(value) {
	return {
		type: types.PUT_TASKS_COMBAT_CARS_SELECT, value
	}
}
export function checkTasksCombatCarSelected(value) {
	return {
		type: types.CHECK_TASKS_COMBAT_CARS_SELECTED, value
	}
}

export function genTasksCombatCarsRegistry() {
	return (dispatch, getState) => {
		//
		let stations = getState().drillStations;
		let carsCombat = JSON.parse(JSON.stringify(getState().tasksDrillCombatCars));
		let carsBusy = getState().tasksBusyCars;
		let carsSelect = []
		//
		stations.forEach((station) => {
			carsCombat.forEach((car) => {
				if (car.stationId === station.id) {
					let c = JSON.parse(JSON.stringify(car));
					carsBusy.forEach((carB) => {
						if (car.id === carB.id) {
							c = {...c,...carB};
							c.busy = true;
						}
					});
					carsSelect.push(c);
				}
			});
		});
		//
		dispatch(putTasksCombatCarsRegistry(carsSelect));
		//
	}
}
export function putTasksCombatCarsRegistry(value) {
	return {
		type: types.PUT_TASKS_COMBAT_CARS_REGISTRY, value
	}
}

export function putTasksFormEditCarsCombatItem(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CARS_COMBAT_ITEM, value
	}
}

export function putTasksFormEditCarsCombatItemInit(value) {
	return {
		type: types.PUT_TASKS_FORM_EDIT_CARS_COMBAT_ITEM_INIT, value
	}
}

export function refreshTasksFormEditCarsCombatItem(value) {
	return {
		type: types.REFRESH_TASKS_FORM_EDIT_CARS_COMBAT_ITEM, value
	}
}

export function genTasksCombatCarsGroupEdit(field) {
	return (dispatch, getState) => {
		//
		let carsCombat = JSON.parse(JSON.stringify(getState().tasksFormEdit.cars));
		let carsSelect = []
		//
		carsCombat.forEach((car) => {
			if (car.returned !== true) {
				carsSelect.push(car);
			}
		});
		//
		dispatch(putTasksCombatCarsGroupEdit(carsSelect));
		//
	}
}
export function putTasksCombatCarsGroupEdit(value) {
	return {
		type: types.PUT_TASKS_COMBAT_CARS_GROUP_EDIT, value
	}
}
export function refreshTasksCombatCarsGroupEdit(field, id, value) {
	return {
		type: types.REFRESH_TASKS_COMBAT_CARS_GROUP_EDIT, field, id, value
	}
}
export function putTasksCombatCarsGroupEditField(value) {
	return {
		type: types.PUT_TASKS_COMBAT_CARS_GROUP_EDIT_FIELD, value
	}
}
