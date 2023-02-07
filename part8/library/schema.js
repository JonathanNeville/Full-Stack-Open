const { gql } = require("apollo-server")


const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Subscription {
    bookAdded: Book!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
    books: [Book!]
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
    allGenres: [String!]
  }
  type Mutation {
    addBook(
       title: String!
       author: String!
       published: Int!
       genres: [String!]! 
    ): Book
    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author
    addAuthor(
      name: String!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

module.exports = typeDefs