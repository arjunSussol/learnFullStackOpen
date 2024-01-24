import { useState } from "react"

const Blog = ({ blog, user, updateBlog }) => {
  const[visible, setVisibility] = useState(false)

  const handleVisibility = () => {
    setVisibility(!visible)
  }

  const handleLike = () => {
    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}<button onClick={handleVisibility}>{visible ? 'Hide' : 'Show'}</button>
        {visible && 
          <div>
            <li>{blog.url}</li>
            <li>{blog.likes} <button onClick={handleLike}>like</button></li>
            <li>{user}</li>
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

export default Blog