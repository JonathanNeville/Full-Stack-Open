import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { changeMessage, resetMessage } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const data = event.target.anecdote.value
        dispatch(createAnecdote(data))
        dispatch(changeMessage(`Added anecdote: ${data}`))
        setTimeout(() => {
            dispatch(resetMessage(''))
        }, 5000);
    }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm