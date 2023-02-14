import axios from 'axios';
import { toast } from 'react-toastify';
import { authActions } from '../slices/authSlice';
import { profileActions } from '../slices/profileSlice';

//  get user profile
export const getUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch(profileActions.setLoading());

    const { data } = await axios.get(`/api/users/profile/${userId}`);

    dispatch(profileActions.setProfile(data));
  } catch (error) {
    dispatch(
      profileActions.setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};

//  update user profile photo
export const uploadUserProfilePhoto =
  (newPhoto) => async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        config
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      // modify localstrorage
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      dispatch(
        profileActions.setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
      toast.error(error.response.data.message);
    }
  };

//  update user profile
export const updateUserProfile =
  (userId, profile) => async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/users/profile/${userId}`,
        profile,
        config
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      // modify localstrorage
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user.username = data?.username;
      localStorage.setItem('userInfo', JSON.stringify(user));
    } catch (error) {
      dispatch(
        profileActions.setError(
          error.response && error.response.data
            ? error.response.data
            : error.message
            ? error.message
            : 'An unexpected error has occured. Please try again later.'
        )
      );
      toast.error(error.response.data.message);
    }
  };

//  delete user profile
export const deleteUserProfile = (userId) => async (dispatch, getState) => {
  try {
    dispatch(profileActions.setLoading());

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    };

    const { data } = await axios.delete(`/api/users/profile/${userId}`, config);

    dispatch(profileActions.setIsProfileDeleted());
    toast.success(data.message);
    setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
  } catch (error) {
    dispatch(
      profileActions.setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};

//  get users count (admin)
export const getUsersCount = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/count`, config);

    dispatch(profileActions.setUsersCount(data));
  } catch (error) {
    dispatch(
      profileActions.setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};

//  get all users profile (admin)
export const getAllUsersProfile = () => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/profile`, config);

    dispatch(profileActions.setProfiles(data));
  } catch (error) {
    dispatch(
      profileActions.setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
    toast.error(error.response.data.message);
  }
};
