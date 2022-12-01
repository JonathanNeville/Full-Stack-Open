import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import Blog from "./Blog";
import userEvent from '@testing-library/user-event'
import CreateBlog from "./CreateBlog";

test('blog renders title, and author but not url and likes', () => {
    const loggedInUser = {
        username: "bort",
        name: "bort bortenberg"
    }
    
    const blog = {
        title: "test one two test",
        author: "wanda",
        url: "test.com",
        user: loggedInUser,
        likes: 4
    }

    const { container } = render(<Blog blog={blog} user={loggedInUser}/>)

    const titleElement = screen.getAllByText("test one two test", {exact: false})
    const authorElement = screen.getAllByText("wanda", {exact: false})
    const expandedDiv = container.querySelector('.expandedBlog')

    expect(titleElement).toBeDefined()
    expect(authorElement).toBeDefined()
    expect(expandedDiv).toHaveStyle('display: none')
})

test('when button for expanding blog is clicked, url and likes are shown', async () => {
    const loggedInUser = {
        username: "bort",
        name: "bort bortenberg"
    }
    
    const blog = {
        title: "test one two test",
        author: "wanda",
        url: "test.com",
        user: loggedInUser,
        likes: 4
    }

    const { container } = render(<Blog blog={blog} user={loggedInUser}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    const expandedDiv = container.querySelector('.expandedBlog')
    await user.click(button)

    expect(expandedDiv).toHaveStyle("display: block")
})

test('if likebutton is pressed twice eventhandler is called twice', async () => {
    const loggedInUser = {
        username: "bort",
        name: "bort bortenberg"
    }
    
    const blog = {
        title: "test one two test",
        author: "wanda",
        url: "test.com",
        user: loggedInUser,
        likes: 4
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} user={loggedInUser} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('event handler for createblog gets called and receives the right details', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<CreateBlog handleCreateBlog={createBlog} />)

    const title = container.querySelector('[name="Title"]')
    const author = container.querySelector('[name="Author"]')
    const url = container.querySelector('[name="Url"]')
    const sendButton = screen.getByText('create')

    await user.type(title, 'hello')
    await user.type(author, 'manny smokefield')
    await user.type(url, 'web.com')
    await user.click(sendButton)

    console.log(createBlog.mock.calls[0][0])

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('hello')
    expect(createBlog.mock.calls[0][0].author).toBe('manny smokefield')
    expect(createBlog.mock.calls[0][0].url).toBe('web.com')
})