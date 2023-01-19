import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')

  const GET_AUTHORS = gql`
    query {
       allAuthors {
        name
        born
        bookCount
      }
    }
  `
  const result = useQuery(GET_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
