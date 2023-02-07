const DataLoader = require('dataloader')
const Book = require('./models/Book')


const batchBooks = async (keys) => {
    const books = await  Book.find({
        where: {
            author: {
                $in: keys
            }
        }
    })
  
    return keys.map(key => books.filter(book => book.author.toString() === key.toString()))
}

const bookLoader = new DataLoader(keys => batchBooks(keys))

module.exports = bookLoader