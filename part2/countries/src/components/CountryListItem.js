import React from 'react'

const CountryListItem = ({ country, setSelectedCountry }) => (
  <div>
    { country.name }
    <button onClick={() => setSelectedCountry(country)}>
      show
    </button>
  </div>
)

export default CountryListItem
