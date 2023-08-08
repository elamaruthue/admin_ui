import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSupervisorData,addSupervisorData} from '../../apis/Supervisor.js';
import { SUPERVISOR, ADDSUPERVISOR } from '../actions/Supervisor.js';

export const getSupervisorTableData = createAsyncThunk(
	SUPERVISOR,
	async (payload, {getState}) => {
		const response = await getSupervisorData(payload);
		return {data: response};
	},
);

export const addSupervisor = createAsyncThunk(
	ADDSUPERVISOR,
	async (payload, {getState}) => {
		const response = await addSupervisorData(payload);
        console.log('response',response);
		return {data: response};
	},
);

export const supervisorSlice = createSlice({
  name: 'supervisor',
  initialState: {
    loading: false,
    error: null,
    SupervisorTable: [],
  },
  reducers: {
    supervisorStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    supervisorSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    supervisorFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupervisorTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSupervisorTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.SupervisorTable = action.payload.data;
      })
      .addCase(getSupervisorTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
      builder.addCase(addSupervisor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSupervisor.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addSupervisor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const { supervisorStart, supervisorSuccess, supervisorFailure } = supervisorSlice.actions;
export default supervisorSlice.reducer;