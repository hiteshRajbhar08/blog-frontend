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

// create new category
export const createCategory = (newCategory) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/categories', newCategory, config);

    dispatch(categoryActions.addCategory(data));
    toast.success('Category created successfully');
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

// delete category
export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/categories/${categoryId}`,
      config
    );

    dispatch(categoryActions.deleteCategory(data.categoryId));
    toast.success(data.message);
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
