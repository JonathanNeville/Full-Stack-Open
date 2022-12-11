import { useDispatch, useSelector } from "react-redux"
import { voteOn } from "../reducers/anecdoteReducer"
import { changeMessage } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const filter = useSelector(state => state.filter)
    console.log('filter', filter)
    const anecdotes = useSelector(state => [...state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))])
    anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteOn(anecdote))
        dispatch(changeMessage(`You voted ${anecdote.content }`, 5))
        
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
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList