import axios from 'axios';
import { toast } from 'react-toastify';
import { postActions } from '../slices/postSlice';

//  fetch post based on page number
export const fetchPosts = (pageNumber) => async (dispatch) => {
  try {
    dispatch(postActions.setLoading());

    const { data } = await axios.get(`/api/posts?pageNumber=${pageNumber}`);

    dispatch(postActions.setPosts(data));
  } catch (error) {
    dispatch(
      postActions.setError(
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

//  get post count
export const getPostsCount = () => async (dispatch) => {
  try {
    dispatch(postActions.setLoading());

    const { data } = await axios.get(`/api/posts/count`);

    dispatch(postActions.setPostsCount(data));
  } catch (error) {
    dispatch(
      postActions.setError(
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

//  fetch post based on category
export const fetchPostBasedOnCategory = (category) => async (dispatch) => {
  try {
    dispatch(postActions.setLoading());

    const { data } = await axios.get(`/api/posts?category=${category}`);

    dispatch(postActions.setPostsCate(data));
  } catch (error) {
    dispatch(
      postActions.setError(
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

//  create post
export const createPost = (newPost) => async (dispatch, getState) => {
  try {
    dispatch(postActions.setLoading());

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    };

    const { data } = await axios.post(`/api/posts`, newPost, config);

    dispatch(postActions.setIsPostCreated(data));
    toast.success('Post Created Successfully');
    setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);
  } catch (error) {
    dispatch(
      postActions.setError(
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

//  fetch single post
export const fetchSinglePost = (postId) => async (dispatch) => {
  try {
    dispatch(postActions.setLoading());

    const { data } = await axios.get(`/api/posts/${postId}`);

    dispatch(postActions.setPost(data));
  } catch (error) {
    dispatch(
      postActions.setError(
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

//  toggle like on post
export const toggleLikePost = (postId) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
      },
    };

    const { data } = await axios.put(`/api/posts/like/${postId}`, {}, config);

    dispatch(postActions.setLike(data));
  } catch (error) {
    dispatch(
      postActions.setError(
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
