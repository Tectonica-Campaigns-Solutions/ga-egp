import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCms from '../components/SeoDatoCms';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import Blocks from '../components/Blocks';

const Page = ({ pageContext, location, data: { page } }) => {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location}/>
      <div className="container mt-5 pt-5">
        
        {/* <HubspotStepsProvider>
          {page.blocks.map((item) => {
            return <HubspotStepsForm forms={item.forms} destination={item.destinationPage.slug} location={location} />;
          })}
        </HubspotStepsProvider> */}
        <Blocks blocks={page.blocks}/>
      </div>
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
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      seo {
        title
        description
      }
      blocks {
        __typename
        ... on DatoCmsBlockHubspotFormStep {
          ...BlockFormSteps
        }
        ... on DatoCmsGroupPerson {
          ...BlockGroupPerson
        }
      }
    }
  }
`;
