import { useDispatch, useSelector } from "react-redux"
import { redirect, useParams } from "react-router-dom"
import { likeBlog, removeBlog } from "../reducers/blogReducer"
import { changeMessage } from "../reducers/notificationReducer"


const BlogView  = () => {
    const id = useParams().id
    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.find((blog) => blog.id === id)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    
    const addOneLike = () => {
        dispatch(likeBlog(blog));
        dispatch(changeMessage(`liked blog ${blog.title}`));
      };

    const handleRemove = () => {
        dispatch(removeBlog(blog))
        return redirect("/")
    }
    
    

    if (!blog) {
        return null
    }

    let showDeleteButton = {}
    if (user) {
        showDeleteButton = {
            display: blog.user.username === user.username ? "" : "none",
            };
    }
    return(
        <div>
            <h2>{blog.title} by {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>
                {blog.likes} likes <button onClick={addOneLike}>like</button>
            </p>
            <p>created by {blog.user.name}</p>
            <button onClick={handleRemove} style={showDeleteButton}>Remove</button>
        </div>
    )
}

export default BlogView