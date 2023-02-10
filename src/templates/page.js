import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import SeoDatoCms from '../components/SeoDatoCms';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Blocks from '../components/Blocks';
import HeroCustom from '../components/Global/HeroCustom/HeroCustom';

const Page = ({ pageContext, location, data: { page, navLinks, breadcrumb } }) => {

  return (
    <Layout>
      {page.customHeader && (
        <HeroCustom
          ctas={page.ctasblock}
          imageHeader={page.backgroundImage}
          description={page.description}
          title={page.title}
          context={pageContext}
          location={location}
          breadcrumb={breadcrumb}
        />
      )}

      {!page.customHeader && <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb}/>}
      {navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}

      {/* <HubspotStepsProvider>
          {page.blocks.map((item) => {
            return <HubspotStepsForm forms={item.forms} destination={item.destinationPage.slug} location={location} />;
          })}
        </HubspotStepsProvider> */}

      <Blocks blocks={page.blocks} />
    </Layout>
  );
};

export default Page;

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const PageQuery = graphql`
  query PageById($id: String) {
    page: datoCmsPage(id: { eq: $id }) {
      id
      title
      slug
      customHeader
      description
      backgroundImage {
        gatsbyImageData
        alt
        url
      }
      ctasblock {
        ... on DatoCmsCtaExternal {
          title
          url
          description
        }
      }
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      seo {
        title
        description
      }
      blocks {
        ... on DatoCmsBlockHubspotFormStep {
          ...BlockFormSteps
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
      }
    }
    navLinks: datoCmsMenu(id: {eq: "DatoCmsMenu-117741821"}) {
      title
      treeParent {
        title
        treeChildren {
          id
          ... on DatoCmsMenu{
            id
            title
            content{
              ... on DatoCmsPage{
                slug
                model{
                  apiKey
                }
              }
              ... on DatoCmsListNews{
                slug
                model{
                  apiKey
                }
              }
              ... on DatoCmsListPosition{
                slug
                model{
                  apiKey
                }
              }
            }
          }
        }
      }
    }
    breadcrumb: datoCmsMenu(id: {eq: "DatoCmsMenu-119373300"}) {
      title
      treeParent {
        title
        content{
          ... on DatoCmsPage{
            slug
            model{
              apiKey
            }
          }
          ... on DatoCmsListNews{
            slug
            model{
              apiKey
            }
          }
          ... on DatoCmsListPosition{
            slug
            model{
              apiKey
            }
          }
        }
        treeParent {
          title
          content{
            ... on DatoCmsPage{
              slug
              model{
                apiKey
              }
            }
            ... on DatoCmsListNews{
              slug
              model{
                apiKey
              }
            }
            ... on DatoCmsListPosition{
              slug
              model{
                apiKey
              }
            }
          }
        }
      }
    }
  }
`;
