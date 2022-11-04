import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Contacts = ({contacts}) => {
  return (
    <div>
      {contacts.map(contact => <p key={contact.name}>{contact.name} {contact.number} </p> ) }
      
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

  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addContact = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filterName={filterName} searchContacts={searchContacts} />
      <h2>Add Contact</h2>
      <ContactForm addContact={addContact} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Contacts contacts={contactsToShow} />
    </div>
  )
}

export default App