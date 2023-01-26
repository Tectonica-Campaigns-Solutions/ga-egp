import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout'
import HeroPage from '../components/Global/HeroPage/HeroPage'
import FilterMembers from '../components/Global/FilterMembers/FilterMembers';
import FilterEvents from '../components/Global/FilterEvents/FilterEvents';

function ListEvents({pageContext, location, data: { list, page}}) {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location}/>
      {/* <FilterMembers members={list.edges} introduction={page.introduction}/> */}
      <FilterEvents />
    </Layout>
  )
}

export const ListEventsQuery = graphql`
  query ListEvents{
    page: datoCmsListEvent {
      title
      slug
    }
    list: allDatoCmsEvent{
      edges {
        node {
          title
        }
      }
    }
  }`

export default ListEvents