import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({blog, user}) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [showDelete, setShowDelete] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none': '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  /* if (blog.user.username === user.username) {
    setShowDelete(true)
  } */

  const showDeleteButton = {display: (blog.user.username === user.username) ? '': 'none'}

  const addOneLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    setLikes(likes + 1)
    await blogs.putBlog(updatedBlog, blog.id)
    
  } 

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      blogs.deleteBlog(blog.id)
    }
    
  }

  const blogStyle = {
    border: 'solid',
    paddingTop: 10,
    paddingLeft: 2,
    borderRadius: 5,
    margin: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenExpanded}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>view</button>
      </div>
      <div style={showWhenExpanded}>
        <p>
          {blog.title} {blog.author}
          <button onClick={toggleExpanded}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={addOneLike}>like</button></p>
        <p>{blog.user.name}</p>
        <button style={showDeleteButton} onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog