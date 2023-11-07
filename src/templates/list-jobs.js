import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Layout from '../components/Layout/Layout';
import SeoDatoCms from '../components/SeoDatoCms';
import ListJobOpportunities from '../components/Blocks/ListJobOpportunities/ListJobOpportunities';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import InnerLayout from '../components/Layout/InnerLayout/InnerLayout';

function ListJobs({
  pageContext,
  location,
  data: { page, breadcrumb, navLinks, favicon, siteTitle, jobs, allMenu, sideNav = null },
}) {
  const secondaryMenu = navLinks.treeParent?.treeParent ? navLinks.treeParent.treeParent : navLinks.treeParent;
  const siblingMenu = sideNav?.treeParent?.treeParent?.treeChildren
    ? sideNav?.treeParent.treeChildren
    : sideNav?.treeChildren;

  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={pageContext.tag ? pageContext.tag : page.title}
        context={pageContext}
        location={location}
        breadcrumb={breadcrumb}
      />

      {!page.hideInnerNavigation && secondaryMenu?.treeChildren && (
        <InnerNavigation
          location={location}
          linkParent={navLinks.treeParent}
          innerMenu={secondaryMenu}
          allMenu={allMenu}
        />
      )}

      {!page.hideSidebarNavigation && siblingMenu && siblingMenu.length > 0 ? (
        <InnerLayout sideNav={siblingMenu} location={location}>
          <ListJobOpportunities values={jobs} />
        </InnerLayout>
      ) : (
        <ListJobOpportunities values={jobs} />
      )}
    </Layout>
  );
}

export const ListJobsQuery = graphql`
  query ListJobs($menuPos: String) {
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
    page: datoCmsListJobOp {
      title
      slug
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    jobs: allDatoCmsJobOpportunity {
      nodes {
        id
        title
        location
        description
        isRemote
        slug
        model {
          apiKey
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
              ... on DatoCmsTagNews {
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsListJobOp {
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
              ... on DatoCmsListPressRelease {
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
            hideInInnerNavigation
            position
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
                ... on DatoCmsTagNews {
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
                ... on DatoCmsListPressRelease {
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
                ... on DatoCmsListJobOp {
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
  }
`;

export default ListJobs;
