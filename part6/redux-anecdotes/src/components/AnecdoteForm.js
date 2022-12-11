import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { changeMessage, resetMessage } from "../reducers/notificationReducer"
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const data = event.target.anecdote.value
        const newAnecdote = await noteService.createNew(data)
        dispatch(createAnecdote(newAnecdote))
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