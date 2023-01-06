import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log("token", token);
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const resetToken = () => {
  token = null;
};

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const putBlog = async (updatedBlog, blogId) => {
  const blogUrl = `${baseUrl}/${blogId}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(blogUrl, updatedBlog, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const blogUrl = `${baseUrl}/${blogId}`;
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(blogUrl, config);
};

const postComment = async (blogId, comment) => {
  const blogUrl = `${baseUrl}/${blogId}/comments`;

  await axios.post(blogUrl, comment);
};

export default {
  setToken,
  resetToken,
  getAll,
  postBlog,
  putBlog,
  deleteBlog,
  postComment,
};
