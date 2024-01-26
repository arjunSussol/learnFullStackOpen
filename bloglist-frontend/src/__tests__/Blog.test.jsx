import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from '../components/Blog'

describe('blog has title and author', () => {
    const blog = {
        title: 'Test title of a blog',
        author: 'author by Test'
    }
    test('render blog title', () => {
        render(<Blog blog={blog}/>)
    
        const element = screen.getByText(/test title of a blog/i)
        expect(element).toBeDefined()
    })

    test('render blog author', () => {
        const { container } = render(<Blog blog={blog}/>)
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(/author BY test/i)
    })

})
