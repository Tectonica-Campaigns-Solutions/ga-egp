import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import InnerNavigation from '../../components/Global/InnerNavigation/InnerNavigation';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import LatestUpdates from '../../components/Blocks/LatestUpdates/LatestUpdates';
import TextHubspotForm from '../../components/Blocks/TextHubspotForm/TextHubsportForm';

import './index.scss';

const Position = ({
  pageContext,
  location,
  data: { position, allMenu, relatedNews, breadcrumb, navLinks, sideNav, favicon, siteTitle },
}) => {
  const { parentTitle } = pageContext;

  const secondaryMenu = navLinks?.treeParent?.treeParent ? navLinks?.treeParent.treeParent : navLinks?.treeParent;

  const siblingMenu = sideNav?.treeParent?.treeParent?.treeChildren
    ? sideNav?.treeParent.treeChildren
    : sideNav?.treeChildren;

  const relatedNewsItems = relatedNews.edges;

  return (
    <Layout>
      <SeoDatoCms seo={position.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={position.title}
        context={pageContext}
        location={location}
        parentTitle={parentTitle}
        breadcrumb={breadcrumb}
      />

      <div className="position-detail">
        {secondaryMenu?.treeChildren && (
          <InnerNavigation location={location} innerMenu={secondaryMenu} allMenu={allMenu} />
        )}

        <InnerLayout sideNav={siblingMenu} location={location}>
          <h1>{position.title}</h1>

          {position.imageHeader && <ImageWrapper image={position.imageHeader} />}
          {position.intro && (
            <div className="intro link-and-list-styles" dangerouslySetInnerHTML={{ __html: position.intro }} />
          )}

          {position.text && (
            <div className="content link-and-list-styles">
              <StructuredContentDefault content={position.text} />
            </div>
          )}

          {/* Form block */}
          {position.form && position.form[0] && <TextHubspotForm block={position.form[0]} />}

          {/* Related new section */}
          {relatedNewsItems && relatedNewsItems.length > 0 && (
            <LatestUpdates
              block={{
                title: 'Related News',
                link: {
                  label: 'See all updates',
                  content: {
                    slug: 'news',
                    model: {
                      apiKey: 'list_news',
                    },
                  },
                },
              }}
              items={relatedNewsItems}
            />
          )}
        </InnerLayout>
      </div>
    </Layout>
  );
};

export default Position;

export const PositionQuery = graphql`
  query PositionById($id: String, $menuPos: String, $newTag: String) {
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
    allMenu: allDatoCmsMenu {
      nodes {
        ...AllMenu
      }
    }
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
        blocks{
          ... on DatoCmsEmbedVideo {
            id: originalId
            __typename
            video {
              url
              providerUid
            }
          }
          ... on DatoCmsEmbedIframe {
            __typename
            id: originalId
            embedCode
          }
          ... on DatoCmsImage {
            __typename
            id: originalId
            image {
              gatsbyImageData
              alt
              title
            }
          }
        }
      }
      form {
        ... on DatoCmsTextHubspotForm {
          id
          title
          description
          variant
          backgroundColor
          backgroundImage {
            url
            alt
            gatsbyImageData
          }
          smallTitle
          hubspot {
            ... on DatoCmsHubspot {
              id
              formId
              portalId
              region
            }
          }
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    relatedNews: allDatoCmsPost(
      filter: { tags: { elemMatch: { id: { eq: $newTag } } } }
      limit: 2
      sort: { date: DESC }
    ) {
      edges {
        node {
          ...PostCard
        }
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
        hideInInnerNavigation
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
            position
          }
        }
        treeChildren {
          id
          position
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
