import React from 'react'

const CountryFilter = ({ newFilter, handleCountryFilter }) => (
  <div>
    find countries: <input autoFocus value={newFilter} onChange={handleCountryFilter} />
  </div>
)

export default CountryFilter
