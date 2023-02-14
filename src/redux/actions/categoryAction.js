import axios from 'axios';
import { toast } from 'react-toastify';
import { categoryActions } from '../slices/categorySlice';

// fetch all categories
export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(categoryActions.setLoading());

    const { data } = await axios.get('/api/categories');

    dispatch(categoryActions.setCategory(data));
  } catch (error) {
    dispatch(
      categoryActions.setError(
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
