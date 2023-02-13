import axios from 'axios';
import { toast } from 'react-toastify';
import { profileActions } from '../slices/profileSlice';

//  get user profile
export const getUserProfile = (userId) => async (dispatch) => {
  try {
    dispatch(profileActions.setLoading());

    const { data } = await axios.get(`/api/users/profile/${userId}`);

    dispatch(profileActions.setProfile(data));
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response.data.message;
  }
};
