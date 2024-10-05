import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'

const blog = {
    title: 'test blog title',
    author: 'test blog author',
    url: 'html:test.blog',
    likes: 5
}

const updateBlog = jest.fn();
const deleteBlog = jest.fn();
const userName = 'Arjun';

describe('blog has title and author', () => {
   
    test('render blog title', () => {
        render(<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={userName}/>)
    
        const element = screen.getByText(/test blog/i)
        expect(element).toBeDefined()
    })

    test('render blog author', () => {
        const { container } = render(<Blog 
            blog={blog}
            updateBlog={updateBlog}
            user={userName}
            deleteBlog={deleteBlog}/>)
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(/test blog/i)
    })
})

describe('event handling using button', () => {

    let container;

    beforeEach(() => {
        container = render(<Blog 
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            user={userName}
            />).container
    })
    
    test('check if show button exist initially', () => {    
        const btnShow = screen.getByText(/show/i);
        expect(btnShow).toBeInTheDocument();
    
    });

    test('at start the children are not displayed', () => {
        const div = container.querySelector('.visibleBlog');
        expect(div).not.toBeInTheDocument();
    });

    test('show children if show button is clicked', async() => {
        const user = userEvent.setup()
        const btn = screen.getByRole('button');
        await user.click(btn);

        expect(container.querySelector('.visibleBlog')).toBeInTheDocument();
        expect(btn).toHaveTextContent(/hide/i);
    })

    test('hide children if hide button is clicked', async() => {
        const user = userEvent.setup()
        const btnShow = screen.getByRole('button', {name: /show/i});
        await user.click(btnShow);

        const btnHide = screen.getByRole('button', {name: /hide/i});
        await user.click(btnHide);

        expect(container.querySelector('.visibleBlog')).not.toBeInTheDocument();
        expect(btnShow).toHaveTextContent(/show/i);
    })

    test('click like button twice', async() => {
        const user = userEvent.setup();
        const showBtn = screen.getByRole('button', { name: /show/i })
        await user.click(showBtn);
        expect(container.querySelector('.visibleBlog')).toBeInTheDocument();

        const likeBtn = screen.getByRole('button', { name: /like/i })
        await user.click(likeBtn);
        await user.click(likeBtn);
        expect(updateBlog.mock.calls).toHaveLength(2);
    })
})



