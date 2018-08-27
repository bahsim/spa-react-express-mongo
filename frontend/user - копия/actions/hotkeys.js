import store from '../store';
import * as types from '../constants/ActionTypes'

import { putAppMode } 	from './main';
import { clearDrillHistoryData } 	from './drillHistory';
import { putTasksWindowState,
				 putTasksRegistryTab,
				 openTasksRecordNew} 			from './tasks';

export function putUserForm(data) {
	return {
		type: types.PUT_USER_FORM, data
	}
}

export function keyPressed(value) {
	return (dispatch, getState) => {
		if (getState().appHasErrored || getState().appIsLoading) {
			return;
		}
		const userForm = getState().userForm;
		switch (userForm) {
			case 'main':
				break;
			case 'drill':
				switch (value) {
					case 'escape':
						dispatch(putUserForm('main'));
						dispatch(putAppMode('main'));
						break;
				}
				break;
			case 'drillHistory':
				switch (value) {
					case 'escape':
						dispatch(putUserForm('main'));
						dispatch(putAppMode('main'));
						dispatch(clearDrillHistoryData());
						break;
				}
				break;
			case 'tasks':
				switch (value) {
					case 'escape':
						dispatch(putUserForm('main'));
						dispatch(putAppMode('main'));
						break;
					case 'insert':
						dispatch(putUserForm('tasksNewRec'));
						dispatch(openTasksRecordNew('editCall101'))
						break;
					case 'left':
						const tasksRegistryTab = getState().tasksRegistryTab;
						switch (tasksRegistryTab) {
							case 'own': 
								dispatch(putTasksRegistryTab('cars')); break;
							case 'current':
							case 'current1':
								if (getState().drillStations.length === 1) {
									dispatch(putTasksRegistryTab('own')); break;
								} else {
									dispatch(putTasksRegistryTab('cars')); break;
								}
								break;
							case 'history':
								dispatch(putTasksRegistryTab('current1')); break;
							case 'cars':
								dispatch(putTasksRegistryTab('history')); break;
						}
						break;
					case 'right':
						const tasksRegistryTab2 = getState().tasksRegistryTab;
						console.log(tasksRegistryTab2);
						switch (tasksRegistryTab2) {
							case 'own': 
								dispatch(putTasksRegistryTab('current1')); break;
							case 'current':
							case 'current1':
								dispatch(putTasksRegistryTab('history')); break;
							case 'history':
								dispatch(putTasksRegistryTab('cars')); break;
							case 'cars':
								if (getState().drillStations.length === 1) {
									dispatch(putTasksRegistryTab('own')); break;
								} else {
									dispatch(putTasksRegistryTab('current1')); break;
								}
								break;
						}
						break;
				}
				break;
			case 'tasksNewRec':
				switch (value) {
					case 'escape':
						dispatch(putUserForm('tasks'));
						dispatch(putTasksWindowState('registry'));
						break;
				}
				break;
			case 'tasksViewRec':
				switch (value) {
					case 'escape':
						dispatch(putUserForm('tasks'));
						dispatch(putTasksWindowState('registry'));
						break;
				}
				break;
			case 'tasksViewRecDate':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('.tasksViewRecDateModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecCaller':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecCallerModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecPlace':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecPlaceModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecStation':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('.tasksViewRecStationModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecCause':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecCauseModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecSignalATC':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecSignalATCModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecCarsSelect':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecCarsSelectModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecCarsEdit':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecCarsEditModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecCarsGroup':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecCarsGroupModal').hide('modal');
						break;
				}
				break;
			case 'tasksViewRecStats':
				switch (value) {
					case 'escape': 
						dispatch(putUserForm('tasksViewRec'));
						$('#tasksViewRecStatsModal').hide('modal');
						break;
				}
				break;
		}
	}
}
