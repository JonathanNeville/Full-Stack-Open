import {useState} from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}%</td>
    </tr>
    )
  }
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if ((props.statistics.good + props.statistics.bad + props.statistics.neutral) === 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.statistics.good}/>
          <StatisticLine text="neutral" value ={props.statistics.neutral}/>
          <StatisticLine text="bad" value ={props.statistics.bad}/>
          <StatisticLine text="all" value ={props.statistics.good + props.statistics.bad + props.statistics.neutral}/>
          <StatisticLine text="average" value ={props.statistics.average}/>
          <StatisticLine text="positive" value ={props.statistics.positive}/>
        </tbody>
      </table>
      
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] =useState(0)
  const [bad, setBad] = useState(0)
  const average = (good + -1 * bad)/(good + bad + neutral)
  const positive = good / (good + bad + neutral) * 100
  const allFeedback = {
    "good": good,
    "neutral": neutral,
    "bad": bad,
    "average": average,
    "positive": positive
  }
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics statistics={allFeedback}/>
      
    </div>
  )
}

export default App;
