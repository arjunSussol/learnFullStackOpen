import { useState } from "react"

const Blog = ({ blog, user }) => {
  const[visible, setVisibility] = useState(false)

  const handleVisibility = () => {
    setVisibility(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}<button onClick={handleVisibility}>{visible ? 'Hide' : 'Show'}</button>
        {visible && 
          <div>
            <li>{blog.url}</li>
            <li>{blog.likes} <button>like</button></li>
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