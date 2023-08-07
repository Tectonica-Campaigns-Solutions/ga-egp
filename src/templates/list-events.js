import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import HeroPage from '../components/Global/HeroPage/HeroPage';
import FilterEvents from '../components/Global/FilterEvents/FilterEvents';
import SeoDatoCms from '../components/SeoDatoCms';
import TextHubspotForm from '../components/Blocks/TextHubspotForm/TextHubsportForm';

function ListEvents({
  pageContext,
  location,
  data: { list, listCongress, page, tags, breadcrumb, favicon, siteTitle },
}) {
  const finalEventList = [...list.edges, ...listCongress.edges];

  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage title={page.title} context={pageContext} location={location} breadcrumb={breadcrumb} />
      <FilterEvents events={finalEventList} tags={tags} />

      {/* Form block */}
      {page.form && page.form[0] && <TextHubspotForm block={page.form[0]} />}
    </Layout>
  );
}

export const ListEventsQuery = graphql`
  query ListEvents($menuPos: String) {
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
    page: datoCmsListEvent {
      title
      slug
      form {
        ... on DatoCmsTextHubspotForm {
          id
          title
          description
          variant
          backgroundColor
          backgroundImage {
            url
            gatsbyImageData
            alt
          }
          smallTitle
          hubspot {
            ... on DatoCmsHubspot {
              id
              formId
              portalId
              region
            }
          }
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    tags: allDatoCmsTagEvent {
      edges {
        node {
          title
          id
        }
      }
    }
    list: allDatoCmsEvent(sort: { date: ASC }) {
      edges {
        node {
          ...EventCard
        }
      }
    }
    listCongress: allDatoCmsCongress(filter: { isCongress: { eq: true } }) {
      edges {
        node {
          id
          slug
          title
          date: date(formatString: "D MMM")
          filterDate: date(formatString: "MMMM")
          year: date(formatString: "Y")
          model {
            apiKey
          }
        }
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
  }
`;

export default ListEvents;
