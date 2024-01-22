import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'
import { BlogForm } from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addNewBlog = async blogObject => {
    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))

  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      
    }  

  }

  const handleLogout = () => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)
      setUsername('')
      setPassword('')
    }
  }

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmitForm={handleLogin}
    />
  )

  const blogForm = () => {
    return(
      <div>
        <h2>blogs</h2>
        <strong>{user.name} is logged in <button onClick={handleLogout}>Logout</button></strong>
        <BlogForm createBlog={addNewBlog}/>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {
        !user ? loginForm() : blogForm()
      }
      
    </div>
  )
}

export default App