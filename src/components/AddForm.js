import React,{useState} from 'react'

const AddForm = ({persons,setPersons}) => {
  
    const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const checkIfExistPerson = (arr, obj) => {
    return arr.some((item) => {
     return (
       item.name.toLowerCase() === obj.name.trim().toLowerCase() ||
       item.number === obj.number.trim()
     ) })
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    if (newName.trim() !== '' || newNumber.trim() !== '') {
      if (checkIfExistPerson(persons, {name:newName,number:newNumber})) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const personObject = {
          name: newName.trim(),
          number: newNumber.trim(),
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
      
    }
  }

  return (
    <form onSubmit={addNewPerson}>
      <div>
        <h2>add a new number</h2>
        name:{' '}
        <input
          onChange={(event) => {
            setNewName(event.target.value)
          }}
          value={newName}
        />{' '}
        <br />
        number:{' '}
        <input
          onChange={(event) => {
            setNewNumber(event.target.value)
          }}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddForm
