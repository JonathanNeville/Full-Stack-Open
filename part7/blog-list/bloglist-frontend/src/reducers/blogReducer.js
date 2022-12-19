import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    setBlogs(state, action) {
      console.log(action.payload);
      return action.payload;
    },
    updateBlog(state, action) {
      console.log("payload", action);
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    filterBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogsService.postBlog(newBlog);
    dispatch(appendBlog(returnedBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToLike = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    console.log(blogToLike);
    await blogsService.putBlog(blogToLike, blogToLike.id);
    dispatch(
      updateBlog({
        ...blog,
        likes: blog.likes + 1,
      })
    );
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(blog.id);
    dispatch(filterBlog(blog));
  };
};

export const { appendBlog, setBlogs, updateBlog, filterBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
