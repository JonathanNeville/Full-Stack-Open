const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "hello",
        "author": "Arto",
        "url": "blog.com/post",
        "likes": 1
    },
    {
        "title": "bye",
        "author": "Tora",
        "url": "nog.com/leave",
        "likes": 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})


test('returns all blog posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
}, 100000)

test('verify that unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('making an HTTP POST request to /api/blogs creates a new blog post', async () => {
    const newBlog = {
        "title": "test",
        "author": "testson",
        "url": "blog.com/test",
        "likes": 21
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

test('if making a post request with likes propery missing defaults to 0', async () => {
    const newBlog = {
        "title": "test",
        "author": "testson",
        "url": "blog.com/test"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[2].likes).toEqual(0)
})

test('trying to post a blog with no title or url response status is 400', async () => {
    const newBlog = {
        "author": "testson",
        "likes": "1",
        
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
})

test('deleting blog deletes blog', async () => {
    const blogsAtstart = await (await api.get('/api/blogs')).body
    const blogToDelete = blogsAtstart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogsAtstart.length - 1)
})

test('updating a blogpost', async () => {

    const blogsAtstart = await (await api.get('/api/blogs')).body
    const blogToUpdate = blogsAtstart[0]
    
    const updatedBlog = {
        "title": "update",
        "author": "updateson",
        "url": "blog.com/updated",
        "likes": 123
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(204)

    const response = await api.get(`/api/blogs/${blogToUpdate.id}`)
    expect(response.body.likes).toEqual(updatedBlog.likes)
}, 100000)

afterAll(() => {
    mongoose.connection.close()
  })