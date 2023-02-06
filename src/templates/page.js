import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import InnerNavigation from '../components/Global/InnerNavigation/InnerNavigation';
import SeoDatoCms from '../components/SeoDatoCms';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Blocks from '../components/Blocks';
import HeroCustom from '../components/Global/HeroCustom/HeroCustom';

const Page = ({ pageContext, location, data: { page, navLinks } }) => {
  return (
    <Layout>
      { page.customHeader && 
        <HeroCustom ctas={page.ctasblock} imageHeader={page.backgroundImage} description={page.description} title={page.title} context={pageContext} location={location}/>
      }
      {
        !page.customHeader && 
        <HeroPage title={page.title} context={pageContext} location={location}/>
      }
      { navLinks && <InnerNavigation location={location} innerMenu={navLinks} />}
     
        
        {/* <HubspotStepsProvider>
          {page.blocks.map((item) => {
            return <HubspotStepsForm forms={item.forms} destination={item.destinationPage.slug} location={location} />;
          })}
        </HubspotStepsProvider> */}
        <Blocks blocks={page.blocks}/>
      
    </Layout>
  );
};

export default Page;

export const Head = ({ data: { page } }) => <SeoDatoCms page={page} />;

export const PageQuery = graphql`
  query PageById($id: String, $menuInner: String) {
    page: datoCmsPage(id: { eq: $id }) {
      id
      title
      slug
      customHeader
      description
      backgroundImage{
        gatsbyImageData
        alt
        url
      }
      ctasblock{
        ... on DatoCmsCtaExternal{
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
    navLinks: datoCmsNavigation(id: { eq: $menuInner }) {
      ...Navigation
    }
  }
`;
