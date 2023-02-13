import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import profileService from './profileService';

// get user profile
export const getUserProfile = createAsyncThunk(
  'profile/userProfile',
  async (userId, thunkAPI) => {
    try {
      return await profileService.getUserProfile(userId);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    error: false,
    loading: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.profile = null;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
