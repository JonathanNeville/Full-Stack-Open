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

const Courses =({courses}) => {
  const mappedCourses = courses.map((course) => <Course course={course} key={course.id} />)
  return mappedCourses
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
]

  return <Courses courses={courses} />
}

export default App