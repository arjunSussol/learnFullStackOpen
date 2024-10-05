import { useState } from "react"

export const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return(
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input id="title" type="text" placeholder="enter title" value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input id="author" type="text" placeholder="enter author" value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                    <label htmlFor="url">URL</label>
                    <input id="url" type="text" placeholder="enter url" value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}