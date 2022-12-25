import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import blogService from "./services/blogs";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

store.subscribe(() => {
  window.localStorage.setItem("loggedInBlogListUser", JSON.stringify(store.getState().user))
  blogService.setToken(store.getState().user.token)
} );

export default store;
