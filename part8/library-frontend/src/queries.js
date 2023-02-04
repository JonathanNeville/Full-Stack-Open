import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        genres
        author {
            name
            born
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`

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
            published
            id
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