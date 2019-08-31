import React from 'react'
import CountryListItem from './CountryListItem'

const CountryList = ({ countries }) => {
  const list = () => (
    countries.map(country => <CountryListItem key={country.name} country={country} />)
  )

  if (countries.length > 10) {
    return ( <p> Too many matches, specify another filter </p>)
  }

  return (
    <div>
      { list() }
    </div>
  )
}

export default CountryList
