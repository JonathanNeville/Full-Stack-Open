import axios from "axios"
import { useState } from "react"
import { Diary } from "../App"

interface DiaryFormProps {
    diaries: Diary[];
    setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryForm = (props: DiaryFormProps) => {
    const [date, setDate] = useState('')
    const [visibility, setVisibility] = useState('')
    const [weather, setWeather] = useState('')
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
                Visibility: <select
                  value={visibility}
                  onChange={(event) => {setVisibility(event.target.value)}}
                >
                    <option value="">-</option>
                    <option value="great" selected>great</option>
                    <option value="good">good</option>
                    <option value="ok">ok</option>
                    <option value="poor">poor</option>
                </select>
                <br />
                Weather: <select
                  value={weather}
                  onChange={(event) => {setWeather(event.target.value)}}
                >
                  <option value="">-</option>
                  <option value="sunny">sunny</option>
                  <option value="rainy">rainy</option>
                  <option value="cloudy">cloudy</option>
                  <option value="stormy">stormy</option>
                  <option value="windy">windy</option>
                </select>
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