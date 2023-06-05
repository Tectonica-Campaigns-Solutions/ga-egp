import React from 'react'

function FieldText({ field }) {
  return (
    <div>
      <label htmlFor="">{field.label}</label>
      <input type="text" name={field.name} />
    </div>
  )
}

export default FieldText