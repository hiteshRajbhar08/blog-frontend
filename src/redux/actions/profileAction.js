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
