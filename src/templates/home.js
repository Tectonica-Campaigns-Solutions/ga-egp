import React from 'react';
import { graphql } from 'gatsby';
import Blocks from '../components/Blocks';
import HeroHome from '../components/Global/HeroHome/HeroHome';
import Layout from '../components/Layout/Layout';
import SeoDatoCms from '../components/SeoDatoCms';

const Home = ({ location, data: { page, favicon, siteTitle } }) => {
  return (
    <div data-datocms-noindex>
      <Layout location={location} navbarWhite={page.textWhite ?? false} navbarYellowHover={page.textWhite ?? false}>
        <SeoDatoCms
          seo={page.seo}
          favicon={favicon}
          siteTitle={siteTitle}
          DsBgImage={page.backgroundImage.gatsbyImageData}
          MbBgImage={page.imageMobile.gatsbyImageData}
          homepage={true}
        />

        <HeroHome
          firstPartTitle={page.firstPartTitle}
          secondPartTitle={page.secondPartTitle}
          colorWords={page.colorWords}
          image={page.backgroundImage.gatsbyImageData}
          imageMobile={page.imageMobile.gatsbyImageData}
          description={page.description}
          form={page.form}
          textWhite={page.textWhite}
        />
        <Blocks blocks={page.blocks} />
      </Layout>
    </div>
  );
};

export default Home;

export const HomeQuery = graphql`
  query HomeById {
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
    page: datoCmsHome {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      firstPartTitle
      secondPartTitle
      colorWords {
        ... on DatoCmsColorWord {
          word
        }
      }
      description
      textWhite
      backgroundImage {
        url
        alt
        gatsbyImageData(width: 2000)
      }
      imageMobile {
        url
        alt
        gatsbyImageData(width: 750)
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
        ... on DatoCmsLatestBlog {
          ...BlockLatestBlog
        }
        ... on DatoCmsUpcomingEvent {
          ...BlockUpcomingEvents
        }
      }
    }
  }
`;
