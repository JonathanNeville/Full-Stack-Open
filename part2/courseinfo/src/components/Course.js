const Header = ({ course }) => <h1>{course}</h1>

const Total = ({parts}) => {
  const toalExercises = parts.reduce(function(sum, part) {
    
    return sum + part.exercises
  }, 0)
  

  return(
    <div>
      <p>total of {toalExercises} exercises</p>
    </div>
  )
}

const Part = ({ name, exercises }) => 
  <p>
    {name} {exercises}
  </p>

const Content = ({ parts }) => {
  const mappedParts = parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id} />)
  return mappedParts
}

const Course = ({course}) =>
  
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />

  </div>

export default Course