import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employee: null,
  token: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.employee = action.payload.employee;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.employee = null;
      state.token = null;
    },
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  }
});

export const { login, logout, reset } = authSlice.actions;
export default authSlice.reducer;
