import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message, className}) => {
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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
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
    console.log('hello')
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const returnedBlog = await blogService.postBlog(newBlog)
    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setBlogs(blogs.concat(returnedBlog)) 
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogListUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
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
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)} />
            </div>
            <div>
                Password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)} />
            </div>
            <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <Notification message={message} className="success"/>
        <div>
          title: 
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({target}) => setTitle(target.value)}  />
        </div>
        <div>
          author: 
          <input 
          type="text"
          value={author}
          name="Author"
          onChange={({target}) => setAuthor(target.value)}  />
        </div>
        <div>
          url: 
          <input 
          type="text"
          value={url}
          name="Url"
          onChange={({target}) => setUrl(target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in
        <button onClick={handleLogout}>log out</button>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
