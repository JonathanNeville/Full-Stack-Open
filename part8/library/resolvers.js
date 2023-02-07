const { UserInputError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args, context) => {
          if (args.genre) {
            return Book.find({genres: args.genre})
          }
          return Book.find({})
      },
      allAuthors: async () => Author.find({}).populate({path: 'books', model: 'Book'}),
      me: async (root, args, context) => context.currentUser,
      allGenres: async () => {
        const books = Book.find({})
        const genres = (await books).map(b => b.genres)
        const uniqueGenres = [...new Set(genres.flat(1))]
        return uniqueGenres
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    },
    Author: {
      bookCount: async (obj, args, context) => {
        const books  = await context.loaders.books.load(obj._id)
        return books.length
      },
      books: async (obj, args, context) => {
        const books  = await context.loaders.books.load(obj._id)
        return books
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
        
         pubsub.publish('BOOK_ADDED', { bookAdded: book })

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

module.exports = resolvers