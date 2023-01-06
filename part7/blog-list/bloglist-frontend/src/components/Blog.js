import { Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    borderRadius: 5,
    margin: 10,
  };

  return (
    <Paper elevation={1} style={blogStyle}>
      <Typography component={Link} to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Typography>
    </Paper>
  );
};

export default Blog;
