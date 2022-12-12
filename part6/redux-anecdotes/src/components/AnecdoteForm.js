import { useDispatch, connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { changeMessage, resetMessage } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    
    const addAnecdote = async (event) => {
        event.preventDefault()
        const data = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(data)
        props.changeMessage(`Added anecdote: ${data}`, 5)
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

const mapDispatchToProps = {
    createAnecdote,
    changeMessage
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm