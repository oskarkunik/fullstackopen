import React from 'react'

const SingleCountry = ({ country }) => {
  const languages = () => country.languages.map(language => (<li key={language.name}>{ language.name }</li>))
  const flagImg = {
    width: '150px',
  };
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
    </div>
  )
}

export default SingleCountry
