import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const[visible, setVisibility] = useState(false)

  const handleVisibility = () => {
    setVisibility(!visible)
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}<button onClick={handleVisibility}>{visible ? 'Hide' : 'Show'}</button>
        {visible && 
          <div>
            <li>{blog.url}</li>
            <li>{blog.likes} <button onClick={updateBlog}>like</button></li>
            <li>{user}</li>
            <button onClick={() => deleteBlog(blog.id)}>remove</button>
          </div>}
      </div>
  </div>
)}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}
export default Blog