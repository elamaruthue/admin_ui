import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmployeeData,addEmployeeData} from '../../apis/employee';
import { ADDEMPLOYEE, EMPLOYEE } from '../actions/employee';

export const getEmployeeTableData = createAsyncThunk(
	EMPLOYEE,
	async (payload, {getState}) => {
		const response = await getEmployeeData(payload);
		return {data: response};
	},
);

export const addEmployee = createAsyncThunk(
	ADDEMPLOYEE,
	async (payload, {getState}) => {
		const response = await addEmployeeData(payload);
		return {data: response};
	},
);

export const emplyeeSlice = createSlice({
  name: 'emplyee',
  initialState: {
    loading: false,
    error: null,
    employeeTable: [],
  },
  reducers: {
    emplyeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    emplyeeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    emplyeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeTableData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployeeTableData.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeTable = action.payload.data;
      })
      .addCase(getEmployeeTableData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
      builder.addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const { emplyeeStart, emplyeeSuccess, emplyeeFailure } = emplyeeSlice.actions;
export default emplyeeSlice.reducer;