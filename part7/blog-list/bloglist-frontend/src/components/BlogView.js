import {
  Button,
  Card,
  Divider,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import { addComment, likeBlog, removeBlog } from "../reducers/blogReducer";
import { changeMessage } from "../reducers/notificationReducer";

const BlogView = () => {
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");

  const addOneLike = () => {
    dispatch(likeBlog(blog));
    dispatch(changeMessage(`liked blog ${blog.title}`));
  };

  const handleRemove = () => {
    dispatch(removeBlog(blog));
    return redirect("/");
  };

  if (!blog) {
    return null;
  }

  let showDeleteButton = {};
  if (user) {
    showDeleteButton = {
      display: blog.user.username === user.username ? "" : "none",
    };
  }

  const submitComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog, comment));
    setComment("");
  };

  let blogUrl = blog.url;

  if (!/^https?:\/\//i.test(blogUrl)) {
    blogUrl = `http://${blogUrl}`;
  }

  return (
    <div>
      <Card sx={{ padding: 3 }}>
        <Typography variant="h4">
          {blog.title} by {blog.author}
        </Typography>
        <Typography>
          <a href={blogUrl}>
            {blogUrl}
          </a>
        </Typography>
        <Typography>
          {blog.likes} likes{" "}
          <Button onClick={addOneLike} size="small">
            Like
          </Button>
        </Typography>
        <Typography>created by {blog.user.name}</Typography>
        <Button onClick={handleRemove} style={showDeleteButton} size="small">
          Remove
        </Button>
      </Card>

      <div>
        <Typography variant="h4">Comments</Typography>
        <form onSubmit={submitComment}>
          <TextField
            multiline
            minRows={2}
            maxRows={4}
            id="comment"
            name="Comment"
            value={comment}
            type="text"
            onChange={(event) => setComment(event.target.value)}
          />
          <Button type="submit">Add comment</Button>
        </form>
        <List>
          {blog.comments.map((comment) => (
            <div key={comment}>
              <ListItem key={comment}>
                <Typography>{comment}</Typography>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default BlogView;
