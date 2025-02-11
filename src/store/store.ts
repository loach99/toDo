import { applyMiddleware, combineReducers, legacy_createStore as createStore, Reducer } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import projectReducer from './projectReducer/projectReducer';
import modalsReducer from './modalReducer/modalsReducer';
import taskReducer from './taskReducer/taskReducer';
import timerReducer from './timerReducer';
import { ModalsReducerState, ProjectType } from '../types';

const rootReducers = combineReducers({
    projectReducer: projectReducer as Reducer<{
        filterData: string; projects: ProjectType[], name: string, description: string
    }>,
    modalsReducer: modalsReducer as Reducer<ModalsReducerState>,
    taskReducer: taskReducer,
    timerReducer: timerReducer as Reducer<{ isRunning: boolean, elapsedTime: string, startTime: any }>,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
