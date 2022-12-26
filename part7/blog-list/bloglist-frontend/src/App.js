import { useState, useEffect } from "react";
import CreateBlog from "./components/CreateBlog";
import TogglableVisibility from "./components/TogglableVisibilty";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import userReducer, { logIn, logOut, returningUser, setUser } from "./reducers/userReducer";
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from "react-router-dom"
import Users from "./components/Users";
import { initializeUsers } from "./reducers/usersReducer";
import User from "./components/User";
import BlogView from "./components/BlogView";

const App = () => {
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    dispatch(logOut())
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
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
  }, [dispatch]);
  if (user === null) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  const navPadding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
          <Link to="/" style={navPadding}>blogs</Link>
          <Link to="/users" style={navPadding}>users</Link>
          {user.name} logged in {" "}
          <button onClick={handleLogout}>log out</button>
        </div>
        <Notification className="success" />
        <TogglableVisibility buttonLabel="create blog">
          <CreateBlog />
        </TogglableVisibility>
        <h2>blogs</h2>
        <Routes>
          <Route path='/' element={<BlogList />} />
          <Route path='/users' element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="blogs/:id" element={<BlogView />} />
        </Routes>
      </Router>
    </div>
  );
  
  
};

export default App;
