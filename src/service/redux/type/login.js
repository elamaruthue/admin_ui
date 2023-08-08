import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getElement, removeElement, setElement } from '../../../utils/localStore';
import { login } from '../../apis/login'; // Assuming you have an API function for login
import { LOGIN } from '../actions/login';

export const verifyAuth = async() => {
  let userinfo = await getElement("login")
  console.log('userinfo',userinfo);
  if (userinfo) {
    let userObj = JSON.parse(userinfo)
    if (userObj === "OK") {
      return true
    } else {
      removeElement('login')
      return true
    }
  }
  return false
}

export const logIn = createAsyncThunk(
	LOGIN,
	async (payload, {getState}) => {
		
		const response = await login(payload);
    setElement('login',response?.data  === 'OK'?true :  false);
		return {data: response};
	},
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      removeElement('login')
      return true;
    } catch (err) {
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    data: verifyAuth(),
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
        state.data = verifyAuth();
        console.log('action?.payload?.data',action?.payload?.data);
        
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred.';
      })
      .addCase(logout.pending, (state) => {
        state.status = "pending";
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.status = "success";
        state.data = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;