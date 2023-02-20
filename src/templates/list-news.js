import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Layout from '../components/Layout/Layout';
import ListPaginated from '../components/Global/Pagination/ListPaginated';
import { isArray } from '../utils';
import CardUpdate from '../components/Global/CardUpdate/CardUpdate';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';

function ListNews({ pageContext, location, data: { page, breadcrumb, navLinks } }) {
  const filteredContent = pageContext.items;

  const shouldRenderMiddleCta = filteredContent.length >= 12;

  return (
    <Layout>
      <HeroPage title={pageContext.tag ? pageContext.tag : page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}
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
  );
}

export const ListNewsQuery = graphql`
  query ListNews($menuPos: String){
    page: datoCmsListNews {
      title
      slug
    }
    navLinks: datoCmsMenu(id: { eq: $menuPos }) {
      title
      treeParent {
        title
        treeChildren {
          id
          ... on DatoCmsMenu {
            id
            title
            content {
              ... on DatoCmsPage {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListNews {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListPosition {
                slug
                model {
                  apiKey
                }
              }
            }
          }
        }
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ... Breadcrumb
    }
  }
`;

export default ListNews;
