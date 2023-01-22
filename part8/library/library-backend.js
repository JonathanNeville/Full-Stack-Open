const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Author = require('./models/Author')
const Book = require('./models/Book')


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDb')
    })
    .catch((error) => {
        console.log('couldn\'t connect to MongoDb', error.message)
    })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        return Book.find({})
        let returnBooks = books
        if (args.author) {
            returnBooks = returnBooks.filter(p => p.author === args.author)
        }
        if (args.genre) {
            returnBooks =  returnBooks.filter(p => p.genres.includes(args.genre))
        }
        return returnBooks
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (obj) => {
        return (await Book.find({author: obj._id})).length
    }
  },
  Mutation : {
    addBook: async (root, args) => {
       const author = await Author.findOne({name: args.author})
       console.log(author)
       const book = new Book({...args, author: author._id})
       try {
        await book.save()
       } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
       }
       return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo  
      try  {
          await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author.save()
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})