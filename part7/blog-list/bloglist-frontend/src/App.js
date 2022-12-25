import { useState, useEffect } from "react";
import CreateBlog from "./components/CreateBlog";
import TogglableVisibility from "./components/TogglableVisibilty";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { changeMessage } from "./reducers/notificationReducer";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import userReducer, { logIn, logOut, returningUser, setUser } from "./reducers/userReducer";

const App = () => {
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedInBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(changeMessage("Wrong Credentials"))
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    dispatch(logOut())
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(
      "loggedInBlogListUser"
    );
    console.log(loggedInUserJSON)
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      console.log(loggedInUser)
      dispatch(returningUser(loggedInUser))
      /* blogService.setToken(loggedInUser.token); */
      console.log(user)
    }
  }, []);
  if (user === null) {
    return (
      <div>
        <Login />
      </div>
    );
  }
  return (
    <div>
      <Notification className="success" />
      <TogglableVisibility buttonLabel="create blog">
        <CreateBlog />
      </TogglableVisibility>
      <BlogList user={user} handleLogout={handleLogout} />
    </div>
  );
};

export default App;
