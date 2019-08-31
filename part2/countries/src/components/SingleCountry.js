import React, {
  useState,
  useEffect
} from 'react'
import axios from 'axios'

const SingleCountry = ({ country }) => {
  const [weather, setWeather] = useState('')
  const languages = () => country.languages.map(language => (<li key={language.name}>{ language.name }</li>))
  const capitalCity = country.capital

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=c50a9c868b93e1f6c8de8f3d8398a91f&units=metric`)
      .then(response => setWeather(response.data))
  }, [capitalCity])

  const flagImg = {
    width: '150px',
    border: '1px solid rgba(0,0,0,.2)'
  };

  const weatherData = () => {
    if (weather) {
      return(
        <>
          <h3>weather in {capitalCity}</h3>
          <h4>{ weather.weather[0].description }</h4>
          <div>temperature: { weather.main.temp } Celsius</div>
          <div>wind: { weather.wind.speed } kph</div>
        </>
      )
    } else {
      return(
        <p>Loading weather..</p>
      )
    }
  }

  return (
    <div>
      <h2>{ country.name }</h2>
      <p>capital { country.capital }</p>
      <p>population { country.population }</p>
      <h3>languages</h3>
      <ul>
        { languages() }
      </ul>
      <img style={flagImg} src={country.flag} alt=''></img>
      { weatherData() }
    </div>
  )
}

export default SingleCountry
