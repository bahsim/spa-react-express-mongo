import { applyMiddleware, compose, createStore } from 'redux';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';

//import reducer from '../reducer';
import { combineReducers } from 'redux';
import * as main 					from '../reducer/main';
import * as drill 				from '../reducer/drill';
import * as drillHistory 	from '../reducer/drillHistory';
import * as tasks 				from '../reducer/tasks';
import * as tasksEdit 		from '../reducer/tasksEdit';
import * as tasksEditCars from '../reducer/tasksEditCars';
import * as hotkeys 			from '../reducer/hotkeys';

export default function configureStore(initialState) {
	initialState = initialState || {};
	return createStore(
			//reducer,
			combineReducers({ 
				...main, 
				...drill, ...drillHistory, 
				...tasks, ...tasksEdit, ...tasksEditCars,
				...hotkeys 
			}),
			initialState,
			//compose(applyMiddleware(thunk, logger()))
			compose(applyMiddleware(thunk))
	);
}
