import React from 'react'
import Link from '../Link'

function CardPost({ item }) {
  const { title, slug, date } = item.node
  return (
    <div>
      <div>{ date }</div>
      <Link to={ slug }>
        <h2>{ title }</h2>
      </Link>
    </div>
  )
}

export default CardPost