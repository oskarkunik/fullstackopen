import React, { useState, useEffect } from 'react'
import CountryFilter from './components/CountryFilter'
import CountryList from './components/CountryList'
import SingleCountry from './components/SingleCountry'
import axios from 'axios'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const applyFilter = (query) => {
    const newCountries = countries
      .filter(
        country => country.name.toLowerCase().includes(query.toLowerCase())
      )
    if (query.length) {
      setFilteredCountries(newCountries)
    } else {
      setFilteredCountries([])
    }
  }

  const handleCountryFilter = (event) => {
    const val = event.target.value
    setSelectedCountry(null)
    setNewFilter(val)
    applyFilter(val)
  }

  const results = () => {
    if (selectedCountry) {
      return (
        <SingleCountry country={selectedCountry} />
      )
    }

    return (
      <CountryList
        countries={filteredCountries}
        setSelectedCountry={setSelectedCountry}
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
