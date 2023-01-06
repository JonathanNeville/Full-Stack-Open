import { useEffect } from "react";
import CreateBlog from "./components/CreateBlog";
import TogglableVisibility from "./components/TogglableVisibilty";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import {
  logOut,
  returningUser,
} from "./reducers/userReducer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Users from "./components/Users";
import { initializeUsers } from "./reducers/usersReducer";
import User from "./components/User";
import BlogView from "./components/BlogView";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    dispatch(logOut());
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem(
      "loggedInBlogListUser"
    );
    console.log(loggedInUserJSON);
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      console.log(loggedInUser);
      dispatch(returningUser(loggedInUser));
      /* blogService.setToken(loggedInUser.token); */
      console.log(user);
    }
  }, [dispatch]);
  if (user === null) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  

  const navBarUserStyle = {
    position: "absolute",
    right: 15,
  };

  return (
    <Container>
      <div>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
              <div style={navBarUserStyle}>
                <Typography variant="overline">
                  {user.name} logged in
                </Typography>

                <Button color="inherit" onClick={handleLogout}>
                  log out
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          <Notification className="success" />
          <TogglableVisibility buttonLabel="create blog">
            <CreateBlog />
          </TogglableVisibility>
          <Typography variant="h2">Blogs</Typography>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="blogs/:id" element={<BlogView />} />
          </Routes>
        </Router>
      </div>
    </Container>
  );
};

export default App;
