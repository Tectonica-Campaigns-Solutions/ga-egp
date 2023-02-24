import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import FilterEvents from '../components/Global/FilterEvents/FilterEvents';

function ListEvents({ pageContext, location, data: { list, page, tags, breadcrumb } }) {
  console.log(breadcrumb)
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      <FilterEvents events={list.edges} tags={tags} />
    </Layout>
  );
}

export const ListEventsQuery = graphql`
  query ListEvents ($menuPos: String){
    page: datoCmsListEvent {
      title
      slug
    }
    tags: allDatoCmsTagEvent {
      edges {
        node {
          title
          id
        }
      }
    }
    list: allDatoCmsEvent(sort: { date: ASC }) {
      edges {
        node {
          ...EventCard
        }
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
  }
`;

export default ListEvents;
