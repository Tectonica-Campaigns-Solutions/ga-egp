import React from 'react'
import GlobalImage from '../Image/GlobalImage';

function CardPosition({ position }) {
  return (
    <div>
      <GlobalImage image={position.imageCard} />
      <div className="text-content">
        <h3>{ position.title }</h3>
      </div>
    </div>
  )
}

export default CardPosition