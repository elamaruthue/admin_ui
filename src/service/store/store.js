import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import { loginSlice } from '../redux/type/login';

const reducers = combineReducers({
    login:loginSlice
});

const rootReducer = (state, action) => {
	// if (action.type === 'logout') {
	// 	// this applies to all keys defined in persistConfig(s)
	// 	storageRemoveItem('persist:root');
	// 	storageClear();
	// 	state = {};
	// }
	return reducers(state, action);
};

const store = configureStore({
	reducer: rootReducer,
});

const dispatch = store.dispatch;

export {store, dispatch};
