import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userInfoFromStorage,
    loading: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
