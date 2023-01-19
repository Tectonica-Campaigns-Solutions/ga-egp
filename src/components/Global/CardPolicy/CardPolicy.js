import React from 'react'

function CardPolicy({ title, intro, docs }) {
  return (
    <div className="card-policy">
      <div>{ title }</div>
      <div
        dangerouslySetInnerHTML={{__html: intro}}
      />
    </div>
  )
}

export default CardPolicy