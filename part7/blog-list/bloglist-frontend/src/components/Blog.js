import { useState } from "react";
import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { changeMessage } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const hideWhenExpanded = { display: expanded ? "none" : "" };
  const showWhenExpanded = { display: expanded ? "" : "none" };
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const showDeleteButton = {
    display: blog.user.username === user.username ? "" : "none",
  };

  const addOneLike = () => {
    dispatch(likeBlog(blog));
    dispatch(changeMessage(`liked blog ${blog.title}`));
  };

  const handleRemoveBlog = () => {
    dispatch(removeBlog(blog));
  };

  const blogStyle = {
    border: "solid",
    paddingTop: 10,
    paddingLeft: 2,
    borderRadius: 5,
    margin: 5,
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenExpanded}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>view</button>
      </div>
      <div style={showWhenExpanded} className="expandedBlog">
        <p>
          {blog.title} {blog.author}
          <button onClick={toggleExpanded}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{" "}
          <button id="likeButton" onClick={addOneLike}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        <button
          id="removeButton"
          style={showDeleteButton}
          onClick={handleRemoveBlog}
        >
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
