import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import InnerNavigation from '../../components/Global/InnerNavigation/InnerNavigation';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCMS from '../../components/SeoDatoCms';

import './index.scss';

const Position = ({ pageContext, location, data: { position, breadcrumb, navLinks, sideNav } }) => {
  console.log(navLinks);
  const { parentTitle } = pageContext;
  const secondaryMenu = navLinks?.treeParent?.treeParent ? navLinks?.treeParent.treeParent : navLinks?.treeParent;
  const siblingMenu = sideNav?.treeParent?.treeParent?.treeChildren
    ? sideNav?.treeParent.treeChildren
    : sideNav?.treeChildren;
  // normalize siblings
  // const normSiblings = siblings.map((item) => item.node);

  // const sidebarLinks = () => {
  //   const updatedSiblings = [{ slug: 'positions', title: 'All positions' }, ...normSiblings];
  //   return <>{normSiblings && <SidebarNav menu={updatedSiblings} location={location} />}</>;
  // };

  return (
    <Layout>
      <HeroPage
        title={position.title}
        context={pageContext}
        location={location}
        parentTitle={parentTitle}
        breadcrumb={breadcrumb}
      />
      {/* {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />} */}

      <div className="position-detail">
        {secondaryMenu?.treeChildren && <InnerNavigation location={location} innerMenu={secondaryMenu} />}
        <InnerLayout sideNav={siblingMenu}>
          <h1>{position.title}</h1>

          {position.imageHeader && <ImageWrapper image={position.imageHeader} />}
          {position.intro && <div className="intro" dangerouslySetInnerHTML={{ __html: position.intro }} />}

          {position.text && (
            <div className="content">
              <StructuredContentDefault content={position.text} />
            </div>
          )}
        </InnerLayout>
      </div>
    </Layout>
  );
};

export default Position;

export const Head = ({ data: { position } }) => <SeoDatoCMS page={position} />;

export const PositionQuery = graphql`
  query PositionById($id: String, $menuPos: String) {
    position: datoCmsPosition(id: { eq: $id }) {
      id
      title
      slug
      intro
      imageHeader {
        url
        alt
        gatsbyImageData
      }
      text {
        value
      }
      seo {
        title
        description
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
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
              ... on DatoCmsPosition {
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
                ... on DatoCmsListPolicyPaper {
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
                ... on DatoCmsPosition {
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
            ... on DatoCmsPosition {
              slug
              model {
                apiKey
              }
            }
          }
        }
      }
      treeParent {
        treeParent {
          treeChildren {
            id
          }
        }
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
              ... on DatoCmsPosition {
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
      ...Breadcrumb
    }
  }
`;
