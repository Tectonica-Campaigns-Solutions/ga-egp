import React from 'react'
import { graphql } from 'gatsby';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Layout from '../components/Layout/Layout';
import ListPaginated from '../components/Global/Pagination/ListPaginated';
import { isArray } from '../utils';
import CardPost from '../components/Global/CardPost/CardPost';

function ListNews({pageContext, location, data: { list, page}}) {
  let filteredContent = list.edges;
  if(pageContext.items){
    filteredContent = pageContext.items;
  }
  
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location}/>
      <div className="container">
        <div className="row mt-5">
          {isArray(filteredContent) && (
            <ListPaginated
              list={filteredContent}
              resetPage={location?.state?.filtered ?? null}
              renderItem={item => (
                <div className="col-lg-4" key={item.id }>
                  <CardPost item={ item }/>
                </div>
              )}
            />
          )}
        </div>

      </div>

    </Layout>
  )
}

export const ListNewsQuery = graphql`
  query ListNews {
    page: datoCmsListNews {
      title
      slug
    }
    list: allDatoCmsPost(sort: {date: DESC}) {
      edges {
        node {
          ...PostCard
        }
      }
    }
  }`

export default ListNews