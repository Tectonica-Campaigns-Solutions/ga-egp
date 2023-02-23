import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import CardPosition from '../components/Global/CardPosition/CardPosition';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import SeoDatoCms from '../components/Global/SeoDatoCms';
import EGPSlider from '../components/Global/EGPSlider/EGPSlider';

import * as styles from './listposition.module.scss';

function ListPositions({ pageContext, location, data: { list, page, navLinks, breadcrumb, sideNav } }) {
  const secondaryMenu = navLinks.treeParent?.treeParent ? navLinks.treeParent.treeParent : navLinks.treeParent;

  const responsiveSettings = [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <Layout>
      <HeroPage title={page.title} breadcrumb={breadcrumb} context={pageContext} location={location} />
      {secondaryMenu && <InnerNavigation location={location} innerMenu={secondaryMenu} />}

      <div className={`container ${styles.listPositionContainer}`}>
        <div className="row">
          <div className="col">
            <div className="row">
              {page.introduction && (
                <div className="col-lg-8">
                  <div className={styles.listPositionText} dangerouslySetInnerHTML={{ __html: page.introduction }} />
                </div>
              )}

              <div className={`col-12 row ${styles.desktopItems}`}>
                {list.edges.map((item) => {
                  return (
                    <div className="col-lg-4 col-md-12 mb-5">
                      <CardPosition position={item.node} showButtons={false} small />
                    </div>
                  );
                })}
              </div>

              <div className={`col-12 row ${styles.mobileItems}`}>
                <EGPSlider responsive={responsiveSettings}>
                  {list.edges.map((item) => {
                    return (
                      <div className="col-lg-4 col-md-12">
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

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const ListPositionsQuery = graphql`
  query ListPositions($menuPos: String) {
    page: datoCmsListPosition {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      seo {
        title
        description
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
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
    sideNav: datoCmsMenu(id: { eq: $menuPos }) {
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
`;
