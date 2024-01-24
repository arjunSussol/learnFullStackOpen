import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'
import { BlogForm } from './components/BlogForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

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
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(`Blog with title ${createdBlog.title} by author ${createdBlog.author} has been added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateExistingBlog = async blogUpdate => {
    const id = blogUpdate.id
    const updatedBlog = await blogService.update(id, blogUpdate)
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <BlogForm createBlog={addNewBlog}/>
        </Togglable>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user.name} updateBlog={updateExistingBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage}/>
      {
        !user ? loginForm() : blogForm()
      }
      
    </div>
  )
}

export default App