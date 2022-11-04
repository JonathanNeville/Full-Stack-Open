import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const ContactForm = ({addContact, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
    <div>
      <form onSubmit={addContact}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
    </div>
  )
}

const Contacts = ({contacts, handleRemove}) => {
  

  return (
    <div>
      {contacts.map(contact => <p key={contact.name}>{contact.name} {contact.number} <button onClick={() => handleRemove(contact.id, contact.name) } >delete</button> </p> ) }
      
    </div>
  )
}

const Search = ({filterName, searchContacts}) => {
  return(
    <div>
      Filter: <input value={filterName} onChange={searchContacts} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  console.log(persons)
  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName))

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addContact = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToChange = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        handleNewNumber(person, personToChange.id )
      }
      
      
      setNewName('')
      setNewNumber('')
    }
    else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const searchContacts = (event) => {
    setFilterName(event.target.value)
  }

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
        .removeFromContacts(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
    }
  }

  const handleNewNumber = (person, id) => {
    personService
          .modify(person, id)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
          })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filterName={filterName} searchContacts={searchContacts} />
      <h2>Add Contact</h2>
      <ContactForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Contacts contacts={contactsToShow} handleRemove={handleRemove} />
    </div>
  )
}

export default App