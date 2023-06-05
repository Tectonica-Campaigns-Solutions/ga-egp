import React from 'react'

function FieldRadio({ field }) {
  return (
    <div>
      <label htmlFor="">{ field.label }</label>
      {
        field.options.map( item => <div><label>{item.label}</label><input type="radio" /></div>)
      }
    </div>
  )
}

export default FieldRadio