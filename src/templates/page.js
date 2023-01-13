import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCms from '../components/SeoDatoCms';
import HubspotStepsForm from '../components/Blocks/HubspotStepsForm/HubspotStepsForm';

const Page = ({ location, data: { page } }) => {
  return (
    <Layout>
      <div className="container mt-5 pt-5">
        <h1>{page.title}</h1>
        {
          page.blocks.map(item => {
            return ( <HubspotStepsForm forms={item.forms} destination={ item.destinationPage.slug } location={location}/> )
          })
        }
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
      blocks{
        ... on DatoCmsBlockHubspotFormStep{
          destinationPage{
            ... on DatoCmsPage{
              slug
            }
          }
          forms{
            
            ... on DatoCmsHubspotFormStep{
              formId
              portalId
              region
            }
          }
        }
      }
    }
  }
`;
