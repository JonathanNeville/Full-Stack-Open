import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    );
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <Typography variant="h4">create new</Typography>
        <div>
          <TextField
            label="Title"
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField
            label="Author"
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <TextField
            label="Url"
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <Button id="submitBlogForm" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default CreateBlog;
