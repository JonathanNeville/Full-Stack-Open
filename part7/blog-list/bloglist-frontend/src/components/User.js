import { Card, Divider, List, ListItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const id = useParams().id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return null;
  }
  return (
    <Card sx={{ padding: 3 }}>
      <Typography variant="h4">{user.name}</Typography>
      <List>
        {user.blogs.map((blog) => (
          <div key={blog.id}>
            <ListItem key={blog.id}>
              <Typography>{blog.title}</Typography>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Card>
  );
};

export default User;
