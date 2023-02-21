import axios from "axios"
import { useState } from "react"
import { Diary } from "../App"

interface DiaryFormProps {
    diaries: Diary[];
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryForm = (props: DiaryFormProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('great')
    const [weather, setWeather] = useState('sunny')
    const [comment, setComment] = useState('')
    const [notification, setNotification] = useState('')

    const submitDiary = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const diaryToAdd = {
            date: date,
            visibility: visibility,
            weather: weather,
            comment: comment
        }


        axios.post('http://localhost:3001/api/diaries', diaryToAdd).then(
            response => {
                props.setDiaries(props.diaries.concat(response.data))
            }
        ).catch((error) => {
            if (axios.isAxiosError(error)) {
                console.log(error.status)
                console.error(error.response)
                setNotification(error.response?.data)
                setTimeout(() => setNotification(''), 5000)
            }
            
        })

        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
    }

    return(
        <div>
            <h3>Add new entry</h3>
            <p style={{color: "red"}}>{notification}</p>
            <form onSubmit={submitDiary}>
                Date: <input
                 value={date}
                 onChange={(event) => {setDate(event.target.value)}}
                 type="date"
                />
                <br/>
                Visibility: <div>
                    Great: <input type="radio" name="visibility" onChange={() => setVisibility("great") }/>
                    Good: <input type="radio" name="visibility" onChange={() => setVisibility("good") }/>
                    Ok: <input type="radio" name="visibility" onChange={() => setVisibility("ok") }/>
                    Poor: <input type="radio" name="visibility" onChange={() => setVisibility("poor") }/>
                </div>
                <br />
                Weather: <div>
                    sunny: <input type="radio" name="weather" onChange={() => setWeather("sunny") }/>
                    rainy: <input type="radio" name="weather" onChange={() => setWeather("rainy") }/>
                    cloudy: <input type="radio" name="weather" onChange={() => setWeather("cloudy") }/>
                    stormy: <input type="radio" name="weather" onChange={() => setWeather("stormy") }/>
                    windy: <input type="radio" name="weather" onChange={() => setWeather("windy") }/>
                </div>
                <br />
                Comment: <input 
                  value={comment}
                  onChange={(event) => {setComment(event.target.value)}}
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default DiaryForm