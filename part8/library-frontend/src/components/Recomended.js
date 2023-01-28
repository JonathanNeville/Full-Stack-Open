import { gql, useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries"

const GET_BOOKS_OF_GENRE = gql`
    query getRecomendedBooks($genre: String!) {
        allBooks(genre: $genre) {
            author {
                name
            }
            title
            published
        }
    }
`

const Recomended = (props) => {
    const  result  = useQuery(GET_BOOKS_OF_GENRE, {variables: {genre: "scifi"}}, )

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>...loading</div>
    }
    console.log(result)
    const books = result.data.allBooks
    console.log(result)
    
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>Author</td>
                        <td>Published</td>
                    </tr>
                {books.map((b) => (
                    <tr key={b.title}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recomended