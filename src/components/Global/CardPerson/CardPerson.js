import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { pathToModel } from '../../../utils'
import Link from '../Link'


function CardPerson({ person }) {
  const url = pathToModel(person.model.apiKey, person.slug)
  return (
    <div className="cardPerson">
        <Link to={url}>
          { person.image && <GatsbyImage image={person.image.gatsbyImageData} /> }
          <h3>{ person.name }</h3>
        </Link>
        <div className="job">{ person.jobPosition }</div>
     
      <div className="social">
          { person.socialLinks && person.socialLinks.length > 0 &&
              person.socialLinks.map(item => <div className={`icon ${item.socialNetwork}`}>{ item.url }</div>)
          }
      </div>
      <div className="phone">
        { person.phone }
      </div>
      <div className="email">
        { person.email }
      </div>
    </div>

  )
}

export default CardPerson