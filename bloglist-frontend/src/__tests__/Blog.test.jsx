import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

test('render blog title and author', () => {
    const blog = {
        title: 'Test title of a blog',
        author: 'author by Test'
    }
    render(<Blog blog={blog}/>)

    const element = screen.getByText(/test title of a blog/i)
    expect(element).toBeDefined()
})