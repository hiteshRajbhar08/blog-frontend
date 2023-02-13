import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
