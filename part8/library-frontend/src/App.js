import { gql, useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recomended from './components/Recomended'
import { BOOK_ADDED, GET_BOOKS, GET_BOOKS_OF_GENRE, GET_USER } from './queries'

export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook))
    }
  })
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [error, setError] = useState("")
  const result = useQuery(GET_USER)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      alert(`Book "${addedBook.title}" added`)

      updateCache(client.cache, { query: GET_BOOKS_OF_GENRE, variables: {genre: ""}}, addedBook)
    }
  })

  
  if (result.loading) {
    return <div>...loading</div>
  }
  
  const loggedInUser = result.data.me

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  
  const genre = loggedInUser ? loggedInUser.favouriteGenre : ""
 
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={{display: token ? "": "none"}} onClick={() => setPage('add')}>add book</button>
        <button style={{display: token ? "none": ""}} onClick={() => setPage('login')}>login</button>
        <button style={{display: token ? "": "none"}} onClick={logout} >logout</button>
        <button style={{display: token ? "": "none"}} onClick={() => setPage('recomend')}>recomended</button>

      </div>


      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login setToken={setToken} setError={setError} result={result} show={page === 'login'}  />

      <Recomended genre={genre} show={page === 'recomend'} />
    </div>
  )
}

export default App
