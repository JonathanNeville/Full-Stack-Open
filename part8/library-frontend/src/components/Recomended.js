import { gql, useQuery } from "@apollo/client"
import { GET_BOOKS_OF_GENRE } from "../queries"


const Recomended = (props) => {
    /* TODO: GET AUTHORS FAVOURITE GENRE AND PASS IT TO QUERY */
    const  result  = useQuery(GET_BOOKS_OF_GENRE, {variables: {genre: props.genre},} )

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>...loading</div>
    }
    
    const books = result.data.allBooks
    
    if (result.variables.genre !== props.genre) {
        result.refetch()
    }
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