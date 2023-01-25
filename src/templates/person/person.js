import React from 'react'
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage'
import Layout from '../../components/Layout/Layout'

function person({ pageContext, location, data: {page } }) {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location}/>
      <div className="container">
        <h1>{ page.name }</h1>
      </div>
    </Layout>
  )
}

export const PersonQuery = graphql`
  query PersonById($id: String) {
    page: datoCmsPerson(id: { eq: $id }) {
      name
    }
  }`

export default person