import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    isProfileDeleted: false,
    usersCount: null,
    profiles: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    setProfilePhoto: (state, action) => {
      state.profile.profilePhoto = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    setUsersCount: (state, action) => {
      state.usersCount = action.payload;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    setIsProfileDeleted: (state, action) => {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearIsProfileDeleted: (state, action) => {
      state.isProfileDeleted = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
