import Content from "./Components/content";
import CourseInfo from "./Components/CourseInfo";
import Header from "./Components/Header";
import Total from "./Components/Total";


const App = () => {
  const courseName = "Half Stack application development"
  const courseParts = [
    {
      name: "fundamentals",
      exerciseCount: 10
    },
    {
      name: "using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    },
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
}

export default App;
