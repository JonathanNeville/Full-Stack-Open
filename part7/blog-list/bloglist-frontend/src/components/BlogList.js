import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = ({user, handleLogout}) => {
    const blogs = useSelector((state) => state.blogs);

    return(
        <div>
            <h2>blogs</h2>
            <p>
                {user.name} logged in {" "}
                <button onClick={handleLogout}>log out</button>
            </p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
            ))}
      </div>
    )
}

export default BlogList