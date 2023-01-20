import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import Link from '../Link'

function CardPost({ item }) {
  const { title, slug, date, image, tags } = item.node
  return (
    <div>
      <div>{ date }</div>
      { tags && tags.length > 0 && tags.map(item => <div>{ item.title }</div>)}
      <h2><Link to={ slug }>{ title }</Link></h2>
      { image &&  <GatsbyImage image={image.gatsbyImageData} />}
    </div>
  )
}

export default CardPost