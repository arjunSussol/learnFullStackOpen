import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'

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

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
      
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

  return (
    <div>
      {
        !user ? loginForm() : <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
      
    </div>
  )
}

export default App