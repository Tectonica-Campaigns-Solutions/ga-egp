import React from 'react'
import { graphql } from 'gatsby';
import HeroPage from '../components/Global/HeroPage/HeroPage'
import Layout from '../components/Layout/Layout'

function ListPodcast({ pageContext, location, data : { page } }) {
  return (
    <Layout>
      <HeroPage title={pageContext.tag ? pageContext.tag : page.title } context={pageContext} location={location} />
      <h1>Hola</h1>
    </Layout>
  )
}

export const ListPodcastQuery = graphql`
  query ListPodcast {
    page: datoCmsListPodcast {
      title
      slug
    }
  }
`;

export default ListPodcast