import { gql, useApolloClient, useQuery } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recomended from './components/Recomended'
import { GET_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [error, setError] = useState("")
  const result = useQuery(GET_USER)
  const client = useApolloClient()

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
