const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET


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

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
        return Book.find({})
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser 
  },
  Author: {
    bookCount: async (obj) => {
        return (await Book.find({author: obj._id})).length
    }
  },
  Book: {
    author: async (obj) => Author.findOne({_id: obj.author})
  },
  Mutation : {
    addBook: async (root, args, context) => {
      const loggedInUser = context.currentUser
  
      if (!loggedInUser) {
        throw new UserInputError("must be logged in to add book")
      }

      let author = await Author.findOne({name: args.author})
       
      if (!author) {
        author = new Author({name: args.author})
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      } 
      

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
    editAuthor: async (root, args, context) => {
      const loggedInUser = context.currentUser
  
      if (!loggedInUser) {
        throw new UserInputError("must be logged in to edit author")
      }

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
    },
    createUser: async (root, args) => {
      const user = new User({...args})
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username})
      
      if (!user || args.password !== 'password') {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})