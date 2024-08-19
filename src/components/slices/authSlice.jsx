import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userId: localStorage.getItem('userId') || null,
  role: localStorage.getItem('role') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('role', action.payload.role);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
