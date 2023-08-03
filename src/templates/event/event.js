import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import EventType from '../../components/Global/CardEvent/EventType/EventType';
import Button from '../../components/Global/Button/Button';
import DateTime from '../../components/Global/DateTime/DateTime';
import Tag from '../../components/Global/Tag/Tag';
import DetailDocLayout from '../../components/Layout/DetailDocLayout/DetailDocLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import Breadcrumb from '../../components/Global/Breadcrumb/Breadcrumb';
import EventList from '../../components/Global/EventList/EventList';
import Section from '../../components/Global/Section/Section';
import TextHubspotForm from '../../components/Blocks/TextHubspotForm/TextHubsportForm';

import './index.scss';

function Event({ data: { event, breadcrumb, favicon, siteTitle, relatedEvents } }) {
  return (
    <Layout>
      <SeoDatoCms seo={event.seo} favicon={favicon} siteTitle={siteTitle} />

      <div className={`event-page section-${event.tags ? event.tags.color : ''}`}>
        <div className="container">
          {breadcrumb && <Breadcrumb items={breadcrumb} breadcrumbDetail={event.title} />}

          <div className="header row">
            <div className="col-lg-5">{event.image && <ImageWrapper image={event.image} />}</div>
            <div className="col-lg-7">
              <div className="event-tags">
                {event.eventType && <EventType type={event.eventType} />}
                {event.tags && <Tag title={event.tags.title} bgColor={`secondary-${event.tags.color}`} />}
              </div>

              <DateTime manualDate={event.manualDate} date={event.date} time={event.time} />
              <h1>{event.title}</h1>
              {event.registerLink && <Button label={event.registerLink.label} url={event.registerLink.url} />}
            </div>
          </div>

          <DetailDocLayout documents={event.documents}>
            {event.textContent && (
              <div className="link-and-list-styles">
                <StructuredContentDefault content={event.textContent} />
              </div>
            )}
          </DetailDocLayout>
        </div>
      </div>

      {relatedEvents.edges && relatedEvents.edges.length > 0 && (
        <Section
          title="Related events"
          link={{
            label: 'See all events',
            content: {
              slug: 'events',
              model: {
                apiKey: 'list_events',
              },
            },
          }}
        >
          <EventList events={relatedEvents.edges} />
        </Section>
      )}

      {/* Form block */}
      {event.form && event.form[0] && <TextHubspotForm block={event.form[0]} />}
    </Layout>
  );
}

export const EventQuery = graphql`
  query EventById($id: String, $menuPos: String, $tagId: String) {
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
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
    relatedEvents: allDatoCmsEvent(filter: { id: {ne: $id}, tags: { id: { eq: $tagId } } }, limit: 2) {
      edges {
        node {
          ...EventCard
        }
      }
    }
    event: datoCmsEvent(id: { eq: $id }) {
      title
      image {
        alt
        gatsbyImageData(width: 602, height: 401)
        url
      }
      time
      manualDate
      date(formatString: "D MMM")
      registerLink {
        ... on DatoCmsGlobalLink {
          label
          url
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
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
      documents {
        ... on DatoCmsDocument {
          language
          document {
            url
            title
          }
        }
      }
      textContent {
        value
        blocks {
          __typename
          id: originalId
          items {
            title
            text
          }
        }
      }
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
    }
  }
`;

export default Event;
