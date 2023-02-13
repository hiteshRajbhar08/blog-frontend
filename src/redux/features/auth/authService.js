import axios from 'axios';
import { toast } from 'react-toastify';

const AUTH_API_URL = '/api/auth';

//Login user
const loginUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(`${AUTH_API_URL}/login`, userData, config);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  toast.success('Login Successfull');

  return response.data;
};

const authService = {
  loginUser,
};

export default authService;
