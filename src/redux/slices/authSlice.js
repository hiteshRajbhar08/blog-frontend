import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state, action) => {
      state.user = null;
    },
    register: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
