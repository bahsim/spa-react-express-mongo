import store from '../store';
import {drillPreLoading,
				putDrillDuties,
				getStationDutySet,
				getStationDutyItem,
				putDrillSupply,
				putDrillMainStaff,
				getStationMainStaffSet,
				getStationMainStaffItem,
				getStationSupplySet,
				putDrillLastSave,
				genStationsLastSaveFlag,
				getStationLastSaveSet,
				genDrillSaveFlagsCurrentSet,
				putDrillDutiesCars,
				putDrillAbsentCars,
				putDrillTasksCars,
				putDrillCars,
				genDrillStats,
				getStationDutyCarsSet,
				getStationDutyCarsItem,
				getStationDrillCarsSet,
				getStationDrillAbsentCarsSet,
				compileDrillCarsBlockView,
				getStationDrillTasksCarsSet} 	
				from './drill';
import { drillHistoryPreLoading } 	from './drillHistory'
import { tasksPreLoading,
				 putTasksDrillData,
				 putTasksRegistryCurrent,
				 filterTasksRegistryCurrent,
				 putTasksWindowState
				 }
				 from './tasks'
import 	{ 
					genTasksDrillCombatCars,
					putTasksBusyCars
				} 
					from './tasksEditCars';
import 	{ 
					refreshAfterSaveCombatCars,
					putTasksFormEdit
				} 
					from './tasksEdit';
import * as types from '../constants/ActionTypes'

export function preLoading(url) {
	return (dispatch, getState) => {
		dispatch(appIsLoading(true));
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				if (value.exit) {location.reload();return;}
				setTimeout(() => {
					dispatch(putCallcenters(value.callcenters));
					dispatch(setWorkDay(value.workDay));
					dispatch(setDutyNumber(value.dutyNumber));
					dispatch(appUser(value.user));
					dispatch(putStations(value.stations));
					//
					dispatch(drillPreLoading(value.drill));
					//
					dispatch(tasksPreLoading(value.tasks));
					//
					dispatch(appIsLoading(false));
				},1000)
			})
			.catch((error) => {
				console.log(error);
				dispatch(appHasErrored(true))
			})
	}
}

export function letMeExit(url) {
	return (dispatch) => {
		if (url) {
			dispatch(appIsLoading(true));
			setTimeout(() => {
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.open( "GET", url, false ); // false for synchronous request
				xmlHttp.send( null );
			},1000)
		}
	}
}

export function appHasErrored(bool) {
	return {
		type: types.APP_HAS_ERRORED, hasErrored: bool
	};
}

export function appIsLoading(bool) {
	return {
		type: types.APP_IS_LOADING, isLoading: bool
	};
}

export function appUser(user) {
	return {
		type: types.APP_USER, user
	}
}

export function putAppMode(value) {
	return {
		type: types.PUT_APP_MODE, value
	}
}

export function putCallcenters(data) {
	return {
		type: types.PUT_CALLCENTERS, data
	}
}

export function putStations(data) {
	return {
		type: types.PUT_STATIONS, data
	}
}

export function getCurrentDateTime(url) {
	return (dispatch, getState) => {
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then((response) => response.json())
			.then((value) => {
				if (value.exit) {location.reload();return;}
				dispatch(appHasErrored(false));
				dispatch(setCurrentDateTimeClear(new Date(value.datetime)));
				dispatch(setCurrentDateTime(new Date(value.datetime).toLocaleString()));
				//
				//
				if (value.drillDutiesCars || value.drillAbsentCars || 
						value.drillTasksCars 	|| value.drillCars) {
					if (value.drillCars) {
						let cars = JSON.parse(JSON.stringify(getState().drillCars));
						cars = [ ...cars, ...value.drillCars];
						dispatch(putDrillCars(cars));
					}
					if (value.drillDutiesCars) {
						dispatch(putDrillDutiesCars(value.drillDutiesCars));
					}
					if (value.drillAbsentCars) {
						dispatch(putDrillAbsentCars(value.drillAbsentCars));
					}
					if (value.drillTasksCars) {
						dispatch(putDrillTasksCars(value.drillTasksCars));
					}
					if (getState().drillStations.length > 0) {
						dispatch(getStationDutyCarsSet(getState().drillStationCurrent.id));
						dispatch(getStationDutyCarsItem(getState().dutyNumber));						
						dispatch(getStationDrillCarsSet());
						dispatch(getStationDrillAbsentCarsSet());
						dispatch(getStationDrillTasksCarsSet());
						if (getState().drillCarsEditItemsToSave.length === 0) {
							console.log(getState().drillCarsCurrentSet)
							dispatch(compileDrillCarsBlockView());						
						}
					}
					dispatch(genDrillStats());
				}
				//
				if (value.tasksSendCars) {
					dispatch(putTasksBusyCars(value.tasksSendCars));
				}
				//
				if (value.tasksDrillData !== undefined) {
					let tasksDrillData = [];
					let stations = getState().drillStations;
					if (value.tasksDrillData.success === true) {
						stations.forEach((s) => {
							value.tasksDrillData.mainData.forEach((d) => {
								if (s.id === d.id) {
									tasksDrillData.push(d);
								}
							});
						});
					}
					dispatch(putTasksDrillData(tasksDrillData));
					dispatch(genTasksDrillCombatCars());
				}
				//
				if (value.drillDuties) {
					dispatch(putDrillDuties(value.drillDuties));
					dispatch(getStationDutySet(getState().drillStationCurrent.id));
					dispatch(getStationDutyItem(getState().dutyNumber));
				}
				if (value.drillSupply) {
					dispatch(putDrillSupply(value.drillSupply));
					dispatch(getStationSupplySet(getState().drillStationCurrent.id));
				}
				if (value.drillMainStaff) {
					dispatch(putDrillMainStaff(value.drillMainStaff));
					dispatch(getStationMainStaffSet(getState().drillStationCurrent.id));
					dispatch(getStationMainStaffItem(getState().dutyNumber));
				}
				if (value.drillLastSave) {
					dispatch(putDrillLastSave(value.drillLastSave));
					dispatch(genStationsLastSaveFlag());
					dispatch(getStationLastSaveSet(getState().drillStationCurrent.id));
					dispatch(genDrillSaveFlagsCurrentSet(getState().dutyNumber));
				}
				//
				if (getState().dutyNumber !== value.dutyNumber && getState().dutyNumber > 0) {
						dispatch(letMeExit('/logout?sid=' + userSid));
						return
				}
				//
				if (value.synchroTasksRegistry) {
					if (Array.isArray(value.synchroTasksRegistry)) {
						processSynchroTasksRegistry(value.synchroTasksRegistry)
					}
				}
				//
				function processSynchroTasksRegistry(tasks) {
					//
					let registry 	= JSON.parse(JSON.stringify(getState().tasksRegistryCurrent));
					let record		= JSON.parse(JSON.stringify(getState().tasksFormEdit));
					//
					let changed 	= false;
					//
					tasks.forEach((task) => {
						switch(task.command) {
							case 'ADD':
								//
								let found = false;
								registry.forEach((entry,index,array) => {
									if (entry.id === task.recordId) { 
										array[index] = task.data;
										found = true;
										changed = true;
										if (record.id === task.recordId) {
											dispatch(putTasksFormEdit(task.data));
										}
									}
								});
								if (found === false) {
									registry.push(task.data);
									changed = true;
								}
								break;
								//
							case 'DEL':
								//
								for (let i = 0; i < registry.length; i++) {
									if (registry[i].id === task.recordId) {
										delete registry.splice(i, 1);
										changed = true;
										break;
									}
								}
								if (record.id === task.recordId) {
									dispatch(putTasksWindowState('registry'));
								}
								break;
								//
						}
					});
					if (changed) {
						try {
							registry.sort((rec1,rec2) => {
								let date1 = new Date(rec1.date + ' ' + rec1.time);
								let date2 = new Date(rec2.date + ' ' + rec2.time);
								if (date1 < date2) return 1;
								if (date1 > date2) return -1;
								return 0
							});
						} catch(e) {}
						dispatch(putTasksRegistryCurrent(registry));
						dispatch(filterTasksRegistryCurrent());
					}
				}
				//
			})
			.catch((error) => {
				console.log(error);
				dispatch(appHasErrored(true))
			})
	};
}
export function setCurrentDateTime(value) {
	return {
		type: types.CURRENT_DATE_TIME, value
	}
}
export function setCurrentDateTimeClear(value) {
	return {
		type: types.CURRENT_DATE_TIME_CLEAR, value
	}
}

export function setWorkDay(value) {
	return {
		type: types.CURRENT_WORK_DAY, value
	}
}

export function setDutyNumber(value) {
	return {
		type: types.CURRENT_DUTY_NUMBER, value
	}
}

