import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.post(baseUrl, blogObject, config)
  return request.data
}

const update = async (id, blogObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return request.data
}

const deleteBlogByID = async id => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, setToken, update, deleteBlogByID }