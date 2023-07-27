import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import SeoDatoCms from '../components/SeoDatoCms';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Blocks from '../components/Blocks';
import HeroCustom from '../components/Global/HeroCustom/HeroCustom';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';

const Page = ({
  pageContext,
  location,
  data: { page, navLinks, breadcrumb, sideNav = null, favicon, siteTitle = null },
}) => {
  const secondaryMenu = navLinks?.treeParent?.treeParent ? navLinks?.treeParent.treeParent : navLinks?.treeParent;

  const siblingMenu = sideNav?.treeParent?.treeParent?.treeChildren
    ? sideNav?.treeParent.treeChildren
    : sideNav?.treeChildren;

  const shouldUseNavbarWhite = page.customHeader && page.backgroundColor === 'pink';

  return (
    <Layout navbarWhite={shouldUseNavbarWhite}>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle}>
        {page.noIndex && <meta name="robots" content="noindex" />}
      </SeoDatoCms>

      {page.customHeader && (
        <HeroCustom
          ctas={page.ctasblock}
          imageHeader={page.backgroundImage}
          description={page.description}
          title={page.title}
          context={pageContext}
          location={location}
          breadcrumb={breadcrumb ? breadcrumb : null}
          bgColor={page.backgroundColor}
          overlap={page.allowOverlap}
        />
      )}

      {!page.customHeader && (
        <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      )}

      {!page.hideInnerNavigation && secondaryMenu?.treeChildren && (
        <InnerNavigation location={location} linkParent={navLinks.treeParent} innerMenu={secondaryMenu} />
      )}

      {!page.hideSidebarNavigation && siblingMenu && siblingMenu.length > 0 ? (
        <InnerLayout sideNav={siblingMenu} location={location}>
          <Blocks blocks={page.blocks} />
        </InnerLayout>
      ) : (
        <Blocks blocks={page.blocks} />
      )}
    </Layout>
  );
};

export default Page;

export const PageQuery = graphql`
  query PageById($id: String, $menuPos: String) {
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
    page: datoCmsPage(id: { eq: $id }) {
      id
      title
      slug
      customHeader
      backgroundColor
      description
      hideSidebarNavigation
      hideInnerNavigation
      backgroundImage {
        gatsbyImageData
        alt
        url
      }
      noIndex
      allowOverlap
      ctasblock {
        ... on DatoCmsCtaExternal {
          url {
            ... on DatoCmsGlobalLink {
              label
              url
            }
          }
          description
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        ... on DatoCmsBlockHubspotFormStep {
          ...BlockFormSteps
        }
        ... on DatoCmsTextHubspotForm {
          ...BlockTextHubspot
        }
        ... on DatoCmsGroupPerson {
          ...BlockGroupPerson
        }
        ... on DatoCmsTextSimple {
          ...BlockTextSimple
        }
        ... on DatoCmsCampaing {
          ...BlockCampaings
        }
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsListJobOpportunity {
          __typename
        }
        ... on DatoCmsTwoColumn {
          ...BlockTwoColumns
        }
        ... on DatoCmsBlockDonation {
          ...BlockDonation
        }
        ... on DatoCmsEmbedIframe{
          id
          __typename
          embedCode
        }
        ... on DatoCmsEmbedVideo{
          id
          __typename
          video{
            url
            providerUid
          }
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
        }
      }
    }
    sideNav: datoCmsMenu(id: { eq: $menuPos }) {
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
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
  }
`;
