import axios from "axios";
import { useEffect, useState } from "react";

interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}


function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  
  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
    setDiaries(response.data)
    })
  }, [])

  return (
    <div>
      <div>
        <h2>Diary Entries</h2>
        <div>
          {diaries.map((d) => {
            return (<div key={d.id}>
              <h4>{d.date}</h4>
              <p>visibility: {d.visibility}</p>
              <p>weather: {d.weather}</p>
            </div>)
          })}
        </div>
        
      </div>
      
    </div>
  );
}

export default App;
