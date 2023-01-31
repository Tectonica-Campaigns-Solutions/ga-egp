import React from 'react'
import Link from '../Link'

function HeroCongress({ title, mainPage=false }) {
  return (
    <div className="container mt-5 pt-5">
      { mainPage ? 'main page congress' : 'inner page '}
      <div className="row">
        <div className="col">
          <Link to={'/events'}>All events</Link>
          { mainPage ? <h1>{ title }</h1> : <h2>{ title }</h2> }
        </div>
      </div>
    </div>
  )
}

export default HeroCongress