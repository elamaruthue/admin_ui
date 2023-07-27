import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { login } from '../../apis/login';
import { LOGIN } from '../actions/login';

const initialState = {
	loading : false,
    data : null,
    error:false
};

export const logIn = createAsyncThunk(
	LOGIN,
	async (payload, {getState}) => {
		
		const response = await login(payload);
		return {data: response};
	},
);


export const loginSlice = createSlice({
	name: 'login',
	initialState,
	extraReducers: {
		[logIn.pending.type]: state => {
			state.loading = true;
			state.error = false;
		},
		[logIn.rejected.type]: (state, action) => {
			state.loading = false;
			state.error = action?.error?.message;
		},
		[logIn.fulfilled.type]: (state, action) => {
			state.loading = false;
            state.data = action.payload
		},
		
	},
});

// export const {logIn} = loginSlice.actions;
export default loginSlice.reducer;
