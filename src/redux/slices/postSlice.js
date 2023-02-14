import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    loading: false,
    error: null,
    posts: [],
    postsCount: null,
    postCate: [],
    isPostCreated: false,
    post: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setPost: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    setPostsCount: (state, action) => {
      state.postsCount = action.payload;
      state.loading = false;
    },
    setPostsCate: (state, action) => {
      state.postCate = action.payload;
      state.loading = false;
    },
    setIsPostCreated: (state, action) => {
      state.isPostCreated = true;
      state.loading = false;
    },
    setLike: (state, action) => {
      state.post.likes = action.payload.likes;
    },
    setUploadImage: (state, action) => {
      state.post.image = action.payload.image;
      state.loading = false;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
      state.loading = false;
    },
    addCommentToPost: (state, action) => {
      state.post.comments.push(action.payload);
    },
    updateCommentPost: (state, action) => {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteCommentFromPost: (state, action) => {
      const comment = state.post.comments.find((c) => c._id === action.payload);
      const commentIndex = state.post.comments.indexOf(comment);
      state.post.comments.splice(commentIndex, 1);
    },
    clearIsPostCreated: (state, action) => {
      state.isPostCreated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions };
