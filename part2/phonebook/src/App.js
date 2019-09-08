import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ filterString, setFilterString] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons = () => {
    personService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }

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

    personService
      .create(newPersonObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
        .remove(person.id)
        .then(() => getAllPersons())
    }
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
      <Filter
        filterString={filterString}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>      
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterString={filterString}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App
