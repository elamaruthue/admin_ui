import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from '../../apis/login'; // Assuming you have an API function for login
import { LOGIN } from '../actions/login';

export const logIn = createAsyncThunk(
	LOGIN,
	async (payload, {getState}) => {
		
		const response = await login(payload);
		return {data: response};
	},
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;