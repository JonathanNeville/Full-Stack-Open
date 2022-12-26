import { Link } from "react-router-dom";

const Blog = ({ blog, user }) => {
  const blogStyle = {
    border: "solid",
    paddingTop: 10,
    paddingLeft: 2,
    borderRadius: 5,
    margin: 5,
  };

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  );
};

export default Blog;
