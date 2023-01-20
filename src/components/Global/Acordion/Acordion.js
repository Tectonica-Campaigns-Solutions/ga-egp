import React from 'react'

function Acordion({ items }) {
  return (
    <div>
      {
        items.map(item => 
          <div>
            <h3>{ item.title }</h3>
            <div>
              { item.text }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Acordion