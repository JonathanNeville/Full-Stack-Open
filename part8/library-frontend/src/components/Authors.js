import { gql, useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { GET_AUTHORS } from "../queries"

const CHANGE_BIRTH_YEAR = gql`
  mutation($name: String!, $year: Int!) {
    editAuthor(
      name: $name
      setBornTo: $year
    ){
      name
      born
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  const result = useQuery(GET_AUTHORS)
  const [ editAuthor ] = useMutation(CHANGE_BIRTH_YEAR, {refetchQueries: [ { query: GET_AUTHORS}]})
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  
  const submit = async (event) => {
    event.preventDefault()

    editAuthor( {variables: { name, year }} )
    setYear("")
    setName("")
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={submit}>
          <div>
            name
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born<input
              type="number"
              value={year}
              onChange={({ target }) => setYear(target.valueAsNumber)}
            />
          </div>
          <button type="submit">Update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
