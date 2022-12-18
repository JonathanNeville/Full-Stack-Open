const blogRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const userExtractor = require("../utils/userExtractor");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  const user = await request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user.id,
    url: body.url,
    likes: body.likes || 0,
  });

  if (blog.title && blog.url) {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog);
    await user.save();
    response.status(201).json(savedBlog);
  } else {
    response.status(400).end();
  }
});

blogRouter.get("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end;
    }
  } catch (exception) {
    response.status(400);
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;

  const loggedInUser = request.user;
  const blog = await Blog.findById(blogId);

  if (blog.user.toString() === loggedInUser.id.toString()) {
    try {
      await Blog.findByIdAndRemove(blogId);
      response.status(204).end();
    } catch (exception) {
      response.status(404).end();
    }
  } else {
    response
      .status(403)
      .json({ error: "logged in user does not match creator of blog" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };
  try {
    await Blog.findByIdAndUpdate(id, blog);
    response.status(204).end();
  } catch (exception) {
    response.status(404).end();
  }
});

module.exports = blogRouter;
