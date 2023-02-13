import axios from 'axios';

const AUTH_API_URL = '/api/users';

// get user profile
const getUserProfile = async (userId) => {
  const response = await axios.get(`${AUTH_API_URL}/profile/${userId}`);
  return response.data;
};

const profileService = {
  getUserProfile,
};

export default profileService;
