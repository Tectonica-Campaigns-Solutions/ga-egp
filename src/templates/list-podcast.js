import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Layout from '../components/Layout/Layout';
import { isArray } from '../utils';
import ListPaginated from '../components/Global/Pagination/ListPaginated';
import CardUpdate from '../components/Global/CardUpdate/CardUpdate';
import SeoDatoCms from '../components/SeoDatoCms';

function ListPodcast({ pageContext, location, data: { page, breadcrumb, favicon, siteTitle, navLinks } }) {
  const filteredContent = pageContext.items;
  const shouldRenderMiddleCta = filteredContent.length >= 12;

  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />
      <HeroPage
        title={pageContext.tag ? pageContext.tag : page.title}
        context={pageContext}
        location={location}
        breadcrumb={breadcrumb}
      />

      <div className="container">
        <div className="row g-5 my-3">
          {isArray(filteredContent) && (
            <ListPaginated
              list={filteredContent}
              resetPage={location?.state?.filtered ?? null}
              renderItem={(item, index) => (
                <React.Fragment key={item.node.id}>
                  <div className="col-lg-4">
                    <CardUpdate post={item.node} />
                  </div>

                  {/* TODO: Add form cta block */}
                  {shouldRenderMiddleCta && index === 5 && <div className="col-lg-12 mt-5 mb-5">Form CTA here...</div>}
                </React.Fragment>
              )}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export const ListPodcastQuery = graphql`
  query ListPodcast($menuPos: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    navLinks: datoCmsMenu(id: { eq: $menuPos }) {
      title
      hideInInnerNavigation
      treeParent {
        title
        treeChildren {
          id
          ... on DatoCmsMenu {
            id
            title
            hideInInnerNavigation
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
              ... on DatoCmsListPodcast {
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
              ... on DatoCmsListPolicyPaper {
                slug
                model {
                  apiKey
                }
              }
            }
          }
        }
        treeParent {
          title
          treeChildren {
            id
            ... on DatoCmsMenu {
              id
              title
              hideInInnerNavigation
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
                ... on DatoCmsListPodcast {
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
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    page: datoCmsListPodcast {
      title
      slug
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
  }
`;

export default ListPodcast;
