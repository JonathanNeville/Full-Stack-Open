import axios from 'axios'
import {useState, useEffect} from 'react'

const Search = ({filterCountry, searchCountries}) => {
  return(
    <form>
      <input value={filterCountry} onChange={searchCountries}/>
    </form>
  )
}
const DisplayCountryFacts = ({country}) => {
  const [temperature, setTemperature] = useState(0)
  const [weatherIcon, setWeatherIcon] = useState('')
  const [wind, setWind] = useState(0)
  const apiKey = process.env.REACT_APP_API_KEY
  console.log(apiKey)
  console.log(country.latlng[0])
  
  console.log("1")
  useEffect( () => {
    console.log("2")
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${apiKey}&units=metric`)
    .then(response => {
      setTemperature(response.data.main.temp)
      setWeatherIcon(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
      setWind(response.data.wind.speed)
      console.log('hi weather')
      console.log(temperature)
    }) 
  
    }, []
  )
  

  

  return(
    <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area  {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        
        <img src={country.flags.png}/>
        <p>temperature {temperature}C</p>
        <img src={weatherIcon} />
        <p>wind {wind} m/s</p>
      </div>
  )

}

const DisplayCountries = ({countriesToDisplay, setFilterCountry}) => {
  if (countriesToDisplay.length === 1) {
    const country = countriesToDisplay[0]
    
    return(
      <DisplayCountryFacts country={country} />
    )
  }
  else if (countriesToDisplay.length < 11) {
    return(
      <div>
          {countriesToDisplay.map(country => <div><p key ={country.name.common}>{country.name.common}</p> <button onClick={() => setFilterCountry(country.name.common)} >Show</button></div>)}
      </div>
    )
  }
  else {
    return (
      <div>
        please refine your search
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        console.log('hi')
      }) 
  }, [])
  console.log('countries in db: ', countries.length)

  const countriesToDisplay = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()) )

  const searchCountries = (event) => {
    setFilterCountry(event.target.value)
    console.log(filterCountry)
  }

  return (
    <div>
      Find Countries 
      <Search filterCountry={filterCountry} searchCountries={searchCountries} />
      <DisplayCountries countriesToDisplay={countriesToDisplay} setFilterCountry={setFilterCountry} />
      
    </div>
  );
}

export default App;
