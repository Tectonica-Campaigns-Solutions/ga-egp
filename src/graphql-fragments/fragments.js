import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment BlockCta on DatoCmsCta {
    title
    isButton
    link {
      ... on DatoCmsGlobalLink {
        label
        url
        content {
          ... on DatoCmsPage {
            ...PageLink
          }
        }
      }
    }
  }
  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id
    title
    pretitle
    textContent
    image {
      gatsbyImageData(width: 700, layout: FIXED)
      alt
      url
    }
    ctas {
      ...BlockCta
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
    link {
      url
      ... on DatoCmsGlobalLink {
        label
        content {
          ... on DatoCmsListEvent {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsPage {
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
    highlightedEvents {
      title
      ... on DatoCmsEvent {
        ...EventCard
      }
    }
  }
  fragment BlockTextSimple on DatoCmsTextSimple {
    __typename
    id
    text
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
        image {
          url
          alt
          gatsbyImageData(width: 400, height: 350)
        }
        links {
          ... on DatoCmsGlobalLink {
            label
            url
          }
        }
      }
    }
    otherCampaigns {
      ... on DatoCmsHighlight {
        id
        title
        description
        image {
          url
          alt
          gatsbyImageData(width: 300)
        }
        backgroundColor
        bannerImage {
          url
          alt
          gatsbyImageData
        }
        form {
          ... on DatoCmsHubspot {
            formId
            portalId
            region
          }
        }
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
    link {
      url
      label
      id
      url
      label
      content {
        ... on DatoCmsPage {
          ...PageLink
        }
        ... on DatoCmsCongress {
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
        ... on DatoCmsListEvent {
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
        ... on DatoCmsListMember {
          slug
          model {
            apiKey
          }
        }
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
  fragment BlockGroupPerson on DatoCmsGroupPerson {
    __typename
    id
    title
    highlighted
    people {
      ... on DatoCmsPerson {
        id
        slug
        name
        image {
          gatsbyImageData(width: 350, height: 350)
          url
          alt
        }
        socialLinks {
          url
          socialNetwork
        }
        phone
        email
        model {
          apiKey
        }
        jobPosition
      }
    }
  }
  fragment CardPosition on DatoCmsPosition {
    id
    title
    slug
    textWhite
    backgroundColor
    imageCard {
      url
      alt
      gatsbyImageData
    }
    model {
      apiKey
    }
    backgroundColor
  }
  fragment CardResolution on DatoCmsResolution {
    title
    slug
    intro
    documents {
      internalName
      language
      document {
        path
        url
        title
      }
    }
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
  fragment MainNavigation on DatoCmsMenu {
    id
    title
    content {
      ... on DatoCmsPage {
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
      ... on DatoCmsListResolution {
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
      ... on DatoCmsListNews {
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
      ... on DatoCmsListPosition {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsListEvent {
        slug
        model {
          apiKey
        }
      }
    }
    treeChildren {
      ... on DatoCmsMenu {
        title
        content {
          ... on DatoCmsPage {
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
          ... on DatoCmsListResolution {
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
          ... on DatoCmsListNews {
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
          ... on DatoCmsListMember {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsListEvent {
            slug
            model {
              apiKey
            }
          }
        }
      }
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
            ...PageLink
          }
          ... on DatoCmsCongress {
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
          ... on DatoCmsListEvent {
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
            ...PageLink
          }
          ... on DatoCmsCongress {
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
          ... on DatoCmsListMember {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsListEvent {
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
          ... on DatoCmsPage {
            ...PageLink
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
    link {
      ... on DatoCmsGlobalLink {
        label
        url
        content {
          ... on DatoCmsPage {
            ...PageLink
          }
          ... on DatoCmsListNews {
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
  }
  fragment MemberCard on DatoCmsMember {
    id
    title
    slug
  }
  fragment EventCard on DatoCmsEvent {
    id
    slug
    title
    date: date(formatString: "D MMM")
    filterDate: date(formatString: "MMMM")
    year: date(formatString: "Y")
    summary
    time
    image {
      alt
      url
      gatsbyImageData
    }
    tags {
      ... on DatoCmsTagEvent {
        title
        id
        color
      }
    }
    eventType {
      ... on DatoCmsEventType {
        title
        icon {
          url
        }
      }
    }
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
  fragment PageLink on DatoCmsPage {
    slug
    model {
      apiKey
    }
  }
  fragment Breadcrumb on DatoCmsMenu {
    title
    treeParent {
      title
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
        ... on DatoCmsListPolicyPaper {
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
        ... on DatoCmsListPosition {
          slug
          model {
            apiKey
          }
        }
      }
      treeParent {
        title
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
          ... on DatoCmsListPosition {
            slug
            model {
              apiKey
            }
          }
        }
        treeParent {
          title
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
`;
