import React from 'react'
import CountryListItem from './CountryListItem'

const CountryList = ({ countries, setSelectedCountry }) => {
  const list = () => (
    countries.map(country =>
      <CountryListItem
        key={country.name}
        country={country}
        setSelectedCountry={setSelectedCountry}
      />)
  )

  if (countries.length > 10) {
    return ( <p> Too many matches, specify another filter </p>)
  } else if (countries.length === 1) {
    setSelectedCountry(countries[0])
  }

  return (
    <div>
      { list() }
    </div>
  )
}

export default CountryList
