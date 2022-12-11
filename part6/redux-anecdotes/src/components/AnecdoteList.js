import { useDispatch, useSelector } from "react-redux"
import { voteOn } from "../reducers/anecdoteReducer"
import { changeMessage, resetMessage } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    console.log('filter', filter)
    const anecdotes = useSelector(state => [...state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))])
    anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteOn(id))
        dispatch(changeMessage(`You voted ${anecdotes.find(anecdote => anecdote.id === id).content }`))
        setTimeout(() => {
            dispatch(resetMessage(''))
        }, 5000);
        
    }

    return(
        <div>
            
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList