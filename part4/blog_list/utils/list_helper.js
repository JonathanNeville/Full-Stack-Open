const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    for (let i = 0; i < blogs.length; i++){
        sum = sum + blogs[i].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    let maxLikes = 0
    let mostLiked = {}
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes >= maxLikes) {
            maxLikes = blogs[i].likes
            mostLiked = blogs[i]
        }
    }
    return mostLiked
}

const mostBlogs = (blogs) => {
    byAuthor = lodash.countBy(blogs, (blog) => {
        return blog.author
    })
    const authors = Object.keys(byAuthor)
    let maxBlogs = 0
    let authorWithMostBlogs = ""
    
    for (let i = 0; i < authors.length; i++) {
        curr = authors[i]
        
        if (byAuthor[curr] > maxBlogs) {
            maxBlogs = byAuthor[curr]
            authorWithMostBlogs = curr
        }
    }
    
    return {
        author: authorWithMostBlogs,
        blogs: maxBlogs
    }

}

const mostLikes = (blogs) => {
    likes = {}
    let mostLikes = 0
    let mostLikedAuthor = ""
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].author in likes) {
            likes[blogs[i].author] += blogs[i].likes
        }
        else {
            likes[blogs[i].author] = blogs[i].likes
        }
        if (likes[blogs[i].author] > mostLikes) {
            mostLikes = likes[blogs[i].author]
            mostLikedAuthor = blogs[i].author
        }
    }
    console.log(likes)
    return {
        author: mostLikedAuthor,
        likes: mostLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}