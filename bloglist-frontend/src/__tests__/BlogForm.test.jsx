import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { BlogForm } from '../components/BlogForm';

test('<BlogForm/> updates parent state and calls onSubmit', async() => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog}/>)

    const title = screen.getByPlaceholderText('enter title');
    const author = screen.getByPlaceholderText('enter author');
    const url = screen.getByPlaceholderText('enter url');
    const createButton = screen.getByRole('button', { name: /create/i });

    await user.type(title, 'New blog creating');
    await user.type(author, 'Arjun Sah');
    await user.type(url, 'www.arjun.sah');
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    console.log(createBlog.mock.calls);
    expect(createBlog.mock.calls[0][0].title).toBe('New blog creating');
    expect(createBlog.mock.calls[0][0].author).toBe('Arjun Sah');
    expect(createBlog.mock.calls[0][0].url).toBe('www.arjun.sah');

})