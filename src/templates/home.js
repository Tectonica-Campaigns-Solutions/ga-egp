import React from 'react';
import { graphql } from 'gatsby';
import Blocks from '../components/Blocks';
import HeroHome from '../components/Global/HeroHome/HeroHome';
import Layout from '../components/Layout/Layout';

const Home = ({ data: { page } }) => {
  return (
    <Layout>
      <HeroHome
        title={page.title}
        image={page.backgroundImage.gatsbyImageData}
        imageMobile={page.imageMobile.gatsbyImageData}
        description={page.description}
        form={page.form}
        textWhite={page.textWhite}
      />
      <Blocks blocks={page.blocks} />
    </Layout>
  );
};

export default Home;

export const HomeQuery = graphql`
  query HomeById {
    page: datoCmsHome {
      title
      description
      textWhite
      backgroundImage {
        url
        alt
        gatsbyImageData
      }
      imageMobile {
        url
        alt
        gatsbyImageData
      }
      form {
        ... on DatoCmsHubspot {
          id
          formId
          region
          portalId
        }
      }
      description
      blocks {
        __typename
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsLogosBlock {
          ...BlockLogos
        }
        ... on DatoCmsTextHubspotForm {
          ...BlockTextHubspot
        }
        ... on DatoCmsHighlightedPosition {
          ...BlockHighlightedPositions
        }
        ... on DatoCmsCampaing {
          ...BlockCampaings
        }
        ... on DatoCmsSocialFollow {
          ...BlockSocialFollow
        }
      }
    }
  }
`;
