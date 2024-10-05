import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import { BlogForm } from '../components/BlogForm';

test('<BlogForm/> updates parent state and calls onSubmit', async() => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm createBlog={createBlog}/>)

    const input = screen.getByRole('textbox');
    const createButton = screen.getByRole('button', { name: /create/i });

    await user.type(input, 'New blog creating');
    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    console.log(createBlog.mock.calls[0][0].title);
    expect(createBlog.mock.calls[0][0].title).toBe('New blog creating');
})