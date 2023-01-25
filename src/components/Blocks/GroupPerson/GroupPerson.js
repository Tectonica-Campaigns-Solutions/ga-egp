import React from 'react'
import CardPerson from '../../Global/CardPerson/CardPerson'

function GroupPerson({ block }) {
  return (
    <div className="groupPerson">
      { block.title && <h3>{ block.title}</h3>}
      <div className="row">
        {
          block.people && block.people.length > 0 && block.people.map(person => {
            return(
              <div className="col-lg-4">
                <CardPerson person={person} key={person.id}/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default GroupPerson