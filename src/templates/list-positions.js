import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import EGPSlider from '../components/Global/EGPSlider/EGPSlider';
import SeoDatoCms from '../components/SeoDatoCms';

import * as styles from './listposition.module.scss';

function ListPositions({
  pageContext,
  location,
  data: { list, page, navLinks, allMenu, breadcrumb, sideNav, favicon, siteTitle },
}) {
  const { seo, title, introduction } = page;
  const items = list.edges ?? [];

  const secondaryMenu = navLinks.treeParent?.treeParent ? navLinks.treeParent.treeParent : navLinks.treeParent;

  const responsiveSettings = [
    { breakpoint: 1250, settings: { slidesToShow: 3 } },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        centerMode: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        centerMode: true,
      },
    },
  ];

  return (
    <Layout>
      <SeoDatoCms seo={seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage title={title} breadcrumb={breadcrumb} context={pageContext} location={location} />
      {secondaryMenu && <InnerNavigation location={location} innerMenu={secondaryMenu} allMenu={allMenu} />}

      <div className={`container ${styles.listPositionContainer}`}>
        <div className="row">
          <div className="col">
            <div className="row">
              {introduction && (
                <div className="col-lg-8">
                  <div
                    className={`${styles.listPositionText} link-and-list-styles`}
                    dangerouslySetInnerHTML={{ __html: introduction }}
                  />
                </div>
              )}

              <div className={`col-12 row ${styles.desktopItems}`}>
                {items.map((item) => {
                  return (
                    <div className="col-xxl-4 col-xl-6 col-lg-6 col-md-12 mb-5" key={item.node.id}>
                      <CardPosition position={item.node} showButtons={false} small />
                    </div>
                  );
                })}
              </div>

              <div className={`col-12 row slider-position-list ${styles.mobileItems}`}>
                <EGPSlider responsive={responsiveSettings}>
                  {items.map((item) => {
                    return (
                      <div className="col-lg-4 col-md-12" key={`responsive-${item.node.id}`}>
                        <CardPosition position={item.node} showButtons={false} />
                      </div>
                    );
                  })}
                </EGPSlider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ListPositions;

export const ListPositionsQuery = graphql`
  query ListPositions($menuPos: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    page: datoCmsListPosition {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      introduction
    }
    list: allDatoCmsPosition(sort: { position: ASC }) {
      edges {
        node {
          ...CardPosition
        }
      }
    }
    allMenu: allDatoCmsMenu {
      nodes {
        ...AllMenu
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
            position
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
              position
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
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
    sideNav: datoCmsMenu(id: { eq: $menuPos }) {
      treeChildren {
        id
        position
        hideInInnerNavigation
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
`;
