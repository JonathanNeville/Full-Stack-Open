import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import TogglableVisibility from './components/TogglableVisibilty'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  
  return (
    <div className={`message ${className}`}>
      {message}
    </div>
  )
}

const App =  () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInBlogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    const returnedBlog = await blogService.postBlog(newBlog)
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setBlogs(blogs.concat(returnedBlog)) 

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  const updateBlog = async (updatedBlog, id) => {
    await blogService.putBlog(updatedBlog, id)
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.deleteBlog(blog.id)
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
      )  

    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
    
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogListUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  if (user === null) {
    return (
      <div>
        <Notification message={message} className="error"/>
        <form onSubmit={handleLogin}>
          <div>
                Username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
                Password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <Notification message={message} className="success"/>
      <TogglableVisibility buttonLabel="create blog">
        <CreateBlog
          handleCreateBlog={handleCreateBlog}
        />
      </TogglableVisibility>
      
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
          <button onClick={handleLogout}>log out</button>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />
        )}
      </div>
    </div>
  )
}

export default App
