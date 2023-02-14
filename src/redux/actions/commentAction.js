import axios from 'axios';
import { toast } from 'react-toastify';
import { commentActions } from '../slices/commentSlice';
import { postActions } from '../slices/postSlice';

// create comment
export const createComment = (newComment) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/comments', newComment, config);

    dispatch(postActions.addCommentToPost(data));
  } catch (error) {
    dispatch(
      commentActions.setError(
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

// update comment
export const updateComment =
  (commentId, comment) => async (dispatch, getState) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getState().auth.user.token}`,
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.put(
        `/api/comments/${commentId}`,
        comment,
        config
      );

      dispatch(postActions.updateCommentPost(data));
    } catch (error) {
      dispatch(
        commentActions.setError(
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

// delete comment
export const deleteComment = (commentId) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.user.token}`,
        'Content-Type': 'application/json',
      },
    };

    await axios.delete(`/api/comments/${commentId}`, config);

    dispatch(postActions.deleteCommentFromPost(commentId));
  } catch (error) {
    dispatch(
      commentActions.setError(
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
