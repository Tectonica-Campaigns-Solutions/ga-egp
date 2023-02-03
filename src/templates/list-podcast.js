import React from 'react'
import { graphql } from 'gatsby';
import HeroPage from '../components/Global/HeroPage/HeroPage'
import Layout from '../components/Layout/Layout'
import { isArray } from '../utils';
import ListPaginated from '../components/Global/Pagination/ListPaginated';
import CardUpdate from '../components/Global/CardUpdate/CardUpdate';

function ListPodcast({ pageContext, location, data : { page } }) {
  const filteredContent = pageContext.items;
  const shouldRenderMiddleCta = filteredContent.length >= 12;
  return (
    <Layout>
      <HeroPage title={pageContext.tag ? pageContext.tag : page.title } context={pageContext} location={location} />
      <div className="container">
        <div className="row g-5 my-5">
          {isArray(filteredContent) && (
              <ListPaginated
                list={filteredContent}
                resetPage={location?.state?.filtered ?? null}
                renderItem={(item, index) => (
                  <>
                    <div className="col-lg-4" key={item.id}>
                      <CardUpdate post={item.node} />
                    </div>

                    {/* TODO: Add form cta block */}
                    {shouldRenderMiddleCta && index === 5 && <div className="col-lg-12 mt-5 mb-5">Form CTA here...</div>}
                  </>
                )}
              />
            )}
        </div>
      </div>
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