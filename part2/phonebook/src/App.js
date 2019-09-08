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

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const createPerson = newPersonObject => {
    personService
      .create(newPersonObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        resetForm()
      })
  }

  const updatePerson = (id, newPersonObject) => {
    personService
      .update(id, newPersonObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
        resetForm()
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personId = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id
        updatePerson(personId, newPersonObject)
      }
      return
    }

    createPerson(newPersonObject)
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
