import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState("")
  
  

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button style={{display: token ? "": "none"}} onClick={() => setPage('add')}>add book</button>
        <button style={{display: token ? "none": ""}} onClick={() => setPage('login')}>login</button>
        <button style={{display: token ? "": "none"}} >logout</button>
      </div>


      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login setToken={setToken} setError={setError} show={page === 'login'}  />
    </div>
  )
}

export default App
