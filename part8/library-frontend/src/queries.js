import { gql } from '@apollo/client'

export const GET_USER = gql`
    query {
        me {
            id
            favouriteGenre
            username
        }
    }
`

export const GET_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`
export const GET_BOOKS = gql`
    query {
        allBooks {
            title
            author{
                name
                born
            }
            published
            genres
        }
    }
`

export const GET_GENRES = gql`
    query {
        allGenres
    }
`

export const GET_BOOKS_OF_GENRE = gql`
    query getRecomendedBooks($genre: String!) {
        allBooks(genre: $genre) {
            author {
                name
            }
            title
            published
        }
    }
`