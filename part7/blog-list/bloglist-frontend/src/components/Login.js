import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeMessage } from "../reducers/notificationReducer";
import { logIn } from "../reducers/userReducer";
import Notification from "./Notification";
import { Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await dispatch(logIn(username, password));
      console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(changeMessage("Wrong Credentials"));
    }
  };

  return (
    <Container fixed={true} sx={{ margin: "auto" }}>
      <Typography variant="h2">Blogs</Typography>
      <Notification className="error" />
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="Username"
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            sx={{ margin: 1 }}
          />
        </div>
        <div>
          <TextField
            label="Password"
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            sx={{ margin: 1 }}
          />
        </div>
        <Button type="submit">login</Button>
      </form>
    </Container>
  );
};
export default Login;
