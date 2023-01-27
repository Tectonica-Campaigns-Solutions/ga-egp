import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout'
import HeroPage from '../components/Global/HeroPage/HeroPage'
import FilterMembers from '../components/Global/FilterMembers/FilterMembers';
import FilterEvents from '../components/Global/FilterEvents/FilterEvents';

function ListEvents({pageContext, location, data: { list, page, tags}}) {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location}/>
      <FilterEvents events={list.edges} tags={tags}/>
    </Layout>
  )
}

export const ListEventsQuery = graphql`
  query ListEvents{
    page: datoCmsListEvent {
      title
      slug
    }
    tags: allDatoCmsTagEvent{
      edges{
        node{
          title
          id
        }
      }
    }
    list: allDatoCmsEvent{
      edges {
        node {
          ... EventCard
        }
      }
    }
  }`

export default ListEvents