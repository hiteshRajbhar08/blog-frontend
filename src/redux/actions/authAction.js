import { authActions } from '../slices/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

// login user
export const loginUser = (user) => async (dispatch) => {
  try {
    dispatch(authActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/login', user, config);

    dispatch(authActions.login(data));
    toast.success('Login Successfull');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// register user
export const registerUser = (user) => async (dispatch) => {
  try {
    dispatch(authActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/auth/register', user, config);

    dispatch(authActions.register(data));
    toast.success('Register Successfull');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  dispatch(authActions.logout());
  toast.success('Logout Successfull');
  localStorage.removeItem('userInfo');
};
