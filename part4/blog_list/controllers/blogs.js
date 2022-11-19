const blogRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    })

    if (blog.title && blog.url) {
      const savedBlog = await blog.save()
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