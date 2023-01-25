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
    backgroundColor
    backgroundImage {
      url
      alt
    }
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
          alt
        }
      }
    }
  }
  fragment BlockUpcomingEvents on DatoCmsUpcomingEvent {
    __typename
    id
    title
  }
  fragment BlockCampaings on DatoCmsCampaing {
    __typename
    id
    title
    link {
      url
      ... on DatoCmsGlobalLink {
        label
      }
    }
    highlight {
      ... on DatoCmsHighlight {
        title
        description
      }
    }
  }
  fragment BlockHighlightedPositions on DatoCmsHighlightedPosition {
    __typename
    id
    title
    pretitle
    description
    positions {
      ... on DatoCmsPosition {
        ...CardPosition
      }
    }
  }
  fragment BlockFormSteps on DatoCmsBlockHubspotFormStep {
    __typename
    id
    destinationPage {
      ... on DatoCmsPage {
        slug
      }
    }
    forms {
      ... on DatoCmsHubspotFormStep {
        formId
        portalId
        region
      }
    }
  }
  fragment BlockGroupPerson on DatoCmsGroupPerson{
    __typename
    id
    title
    people{
      ... on DatoCmsPerson{
        id
        slug
        name
        image{
          gatsbyImageData
        }
        jobPosition
      }
    }
  }
  fragment CardPosition on DatoCmsPosition {
    title
    slug
    imageCard {
      url
      alt
      gatsbyImageData
    }
    model {
      apiKey
    }
  }
  fragment CardResolution on DatoCmsResolution {
    title
    slug
    intro
    council {
      ... on DatoCmsCouncil {
        idFilter
        title
      }
    }
    model {
      apiKey
    }
  }
  fragment Navigation on DatoCmsNavigation {
    title
    navigationItems {
      id
      label
      isButton
      hasSubmenu
      icon {
        url
        alt
      }
      mainLink {
        id
        url
        label
        content {
          ... on DatoCmsPage {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsListResolution {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsListResolution {
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
          ... on DatoCmsListMember {
            slug
            model {
              apiKey
            }
          }
        }
      }
      links {
        id
        url
        label
        content {
          ... on DatoCmsPage {
            slug
          }
        }
      }
    }
  }
  fragment BlockSocialFollow on DatoCmsSocialFollow {
    __typename
    id
    title
    links {
      ... on DatoCmsNavigationItem {
        label
        mainLink {
          ... on DatoCmsGlobalLink {
            url
            label
          }
        }
        icon {
          url
        }
      }
    }
  }
  fragment BlockLatestBlog on DatoCmsLatestBlog {
    __typename
    title
    linkLabel
  }
  fragment MemberCard on DatoCmsMember {
    id
    title
    slug
  }
  fragment PostCard on DatoCmsPost {
    id
    title
    slug
    image {
      alt
      gatsbyImageData
    }
    tags {
      ... on DatoCmsTagNews {
        title
        id
        slug
      }
    }
    date(formatString: "D MMM Y")
    model {
      apiKey
    }
    meta {
      publishedAt(formatString: "D MMM YYYY")
    }
  }
`;
