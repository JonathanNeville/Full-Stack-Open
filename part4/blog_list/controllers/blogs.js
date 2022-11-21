const blogRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body

    console.log('token', request.token)
    
    const decodedToken = jwt.verify(request.token, process.env.TOKEN_SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({error: "token missing or invalid"})
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes || 0
    })


    if (blog.title && blog.url) {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog)
      await user.save()
      response.status(201).json(savedBlog)
    }
    else {
      response.status(400).end()
    } 
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    }
    else{
      response.status(404).end
    }
  }
  catch(exception) {
    response.status(400)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  try  {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
  catch (exception) {
    response.status(404).end()
  }
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  try  {
    await Blog.findByIdAndUpdate(id, blog)
    response.status(204).end()
  }
  catch (exception) {
    response.status(404).end()
  }
})

module.exports = blogRouter