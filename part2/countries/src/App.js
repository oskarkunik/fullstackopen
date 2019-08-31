import React, { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'
import SingleCountry from './components/SingleCountry'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleCountryFilter = (event) => {
    const val = event.target.value
    setNewFilter(val)

    const newFilteredCountries = countries
      .filter(
        country => country.name.toLowerCase().includes(val.toLowerCase())
      )

    if (val.length) {
      setFilteredCountries(newFilteredCountries)
    } else {
      setFilteredCountries([])
    }

  }

  const results = () => {
    if (filteredCountries.length === 1) {
      return (
        <SingleCountry country={filteredCountries[0]} />
      )
    }

    return (
      <CountryList
        countries={filteredCountries}
      />
    )
  }

  return (
    <div>
      <CountryFilter
        newFilter={newFilter}
        handleCountryFilter={handleCountryFilter}
      />

      { results() }
    </div>
  )
}

export default App;
