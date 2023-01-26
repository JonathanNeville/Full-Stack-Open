import { useQuery } from "@apollo/client"
import { useState } from "react"
import ReactSelect from "react-select"

import { GET_BOOKS } from "../queries"

const Books = (props) => {
  const [filteredBooks, setFilteredBooks] = useState([])

  const result = useQuery(GET_BOOKS)
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks
  

  const allGenres = []
  for (let i = 0; i < books.length; i++) {
    allGenres.push(...books[i].genres)
  }
  const  uniqueGenres =  [...new Set(allGenres)]
  const selectOptions = uniqueGenres.map((g) =>(
    {value: g, label: g}
  ))

  const applyFilter = (target) => {
    setFilteredBooks(books.filter(b => b.genres.includes(target.value)))
    
  }
  
  const booksToShow = filteredBooks.length === 0 ? books : filteredBooks
  
  
  return (
    <div>
      <h2>books</h2>
     
      <ReactSelect 
      options={
        selectOptions.concat({value: "All Genres", label: "All Genres"})
      }
      onChange={applyFilter}
      defaultValue={{value: "All Genres", label: "All Genres"}}
      />
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
