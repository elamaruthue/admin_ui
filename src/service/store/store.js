import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit'; // Correct import path for combineReducers
import { emplyeeSlice } from '../redux/type/employee';
import { loginSlice } from '../redux/type/login';

const reducers = combineReducers({
  login: loginSlice.reducer, // Access the reducer property of the loginSlice
  emplyee:emplyeeSlice.reducer
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

export { store, dispatch };