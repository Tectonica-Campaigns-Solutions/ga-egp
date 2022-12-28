import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id
    title
    pretitle
    textContent
    image {
      gatsbyImageData(width: 500, height: 500)
      alt
      url
    }
    ctas {
      title
      isButton
      link {
        ... on DatoCmsGlobalLink {
          label
          url
          content {
            ... on DatoCmsPage {
              slug
            }
          }
        }
      }
    }
  }

  fragment BlockTextHubspot on DatoCmsTextHubspotForm {
    __typename
    id
    title
    hubspot {
      ... on DatoCmsHubspot {
        formId
        region
        portalId
      }
    }
  }
  fragment BlockLogos on DatoCmsLogosBlock {
    __typename
    id
    logos {
      ... on DatoCmsLogo {
        id
        name
        url
        icon {
          gatsbyImageData
          url
        }
      }
    }
  }
  fragment BlockHighlightedPositions on DatoCmsHighlightedPosition{
    __typename
    id
    title
    pretitle
    description
    positions{
      ... on DatoCmsPosition{
        title
        imageCard{
          url
          gatsbyImageData
        }
      }
    }
  }
`;
