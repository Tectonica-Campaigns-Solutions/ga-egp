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
import SeoDatoCMS from '../../components/SeoDatoCms';

import './index.scss';

function Event({ data: { event } }) {
  return (
    <Layout>
      <div className={`event-page section-${event.tags.color}`}>
        <div className="container">
          <div className="header row">
            <div className="col-lg-5">{event.image && <ImageWrapper image={event.image} />}</div>
            <div className="col-lg-7">
              <div className="event-tags">
                <EventType type={event.eventType} />
                <Tag title={event.tags.title} bgColor={`secondary-${event.tags.color}`} />
              </div>

              <DateTime date={event.date} time={event.time} />

              <h1>{event.title}</h1>

              {event.registerLink && <Button label={event.registerLink.label} url={event.registerLink.url} />}
            </div>
          </div>

          <DetailDocLayout documents={event.documents}>
            {event.textContent && <StructuredContentDefault content={event.textContent} />}
          </DetailDocLayout>
        </div>
      </div>
    </Layout>
  );
}

export const Head = ({ data: { event } }) => <SeoDatoCMS page={event} />;

export const EventQuery = graphql`
  query EventById($id: String) {
    event: datoCmsEvent(id: { eq: $id }) {
      title
      image {
        alt
        gatsbyImageData(width: 602, height: 401)
        url
      }
      time
      date(formatString: "D MMM")
      registerLink {
        ... on DatoCmsGlobalLink {
          label
          url
        }
      }
      seo {
        title
        description
      }
      seoMetaTags {
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
    }
  }
`;

export default Event;
