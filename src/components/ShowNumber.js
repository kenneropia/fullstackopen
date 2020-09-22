import React,{useState} from 'react'

const ShowNumber = ({persons,newField}) => {
  
 const filteredPersons = newField.trim()
   ? persons.filter((item) => {
       return item.name.toLowerCase().includes(newField.toLowerCase())
     })
   : persons
  
  
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <li>
            {person.name} {person.number}
          </li>
        ))}
      </div>
    </div>
  )
}

export default ShowNumber