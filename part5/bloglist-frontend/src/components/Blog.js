import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({blog}) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none': '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }
  console.log(blog.likes)
  const toggleExpanded = () => {
    setExpanded(!expanded)
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
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog