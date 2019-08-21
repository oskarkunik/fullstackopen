import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123 456 789' }
  ]) 
  const [ filterString, setFilterString] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const rows = () => persons
    .filter(person => person.name.toLowerCase().includes(filterString))
    .map(person =>
      <div key={person.name}>{ person.name } { person.number } </div>
  )

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(newPersonObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          value={filterString}
          onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>      
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}/>
        </div>
        <div>number: <input
          value={newNumber}
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { rows() }
    </div>
  )
}

export default App