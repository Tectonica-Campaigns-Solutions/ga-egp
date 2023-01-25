import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Link from '../Link'

function CardPerson({ person }) {
  return (
    <div className="cardPerson">
      <Link to={`/${person.slug}`}>
        { person.image && <GatsbyImage image={person.image.gatsbyImageData} /> }
        <h3>{ person.name }</h3>
        <div className="job">{ person.jobPosition }</div>
      </Link>
    </div>

  )
}

export default CardPerson