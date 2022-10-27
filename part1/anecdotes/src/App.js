import { useState } from 'react'



const HighestVoted = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.index]}</p>
      <p>Has {props.points[props.index]} votes </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const setToValue = (newValue) => {
    setSelected(newValue)
  }

  const RandomValue = () => {
    let randomNumber = selected
    while (randomNumber === selected) {
      randomNumber = (Math.floor(Math.random() * anecdotes.length))
    }
    return randomNumber
  }

  

  const AddPoint = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  
  const IndexOfMostVotes = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button onClick={() => setToValue(RandomValue)}>New Quote</button>
      <button onClick={() => AddPoint()} >Vote</button>
      <h2>Anecdote with most votes</h2>
      <HighestVoted anecdotes={anecdotes} index={IndexOfMostVotes()} points={points} />
      
    </div>
  )
}

export default App;
