import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMessage } from "../reducers/notificationReducer";
import { logIn } from "../reducers/userReducer";
import Notification from "./Notification"
import blogService from "../services/blogs";

const Login = () => {
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault();

    try  {
      const user = await dispatch(logIn(username, password))
      /* window.localStorage.setItem("loggedInBlogListUser", JSON.stringify(user));
      blogService.setToken(user.token); */
      console.log(user)
      setUsername("");
      setPassword("");
      
    } catch (exception) {
      dispatch(changeMessage("Wrong Credentials"))
    }
    
  };

  return (
    <div>
      <Notification  className="error" />
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  
  };
export default Login;
