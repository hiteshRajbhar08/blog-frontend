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
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
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
