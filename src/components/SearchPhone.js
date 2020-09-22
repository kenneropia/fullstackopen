import React from 'react'

const SearchPhone = ({ newField,setNewField }) => {
  return (
    <div>
      <h2>search for a name</h2>
      <input
        value={newField}
        onChange={(event) => {
          setNewField(event.target.value)
        }}
      />
    </div>
  )
}

export default SearchPhone