import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import EventTag from '../../components/Global/CardEvent/EventTag/EventTag';
import Button from '../../components/Global/Button/Button';

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
                <EventTag title={event.tags.title} />
              </div>

              <div className="date">
                <span>10 JAN | 09:00 to 18:00</span>
              </div>

              <h1>{event.title}</h1>
              <Button label="Register" />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 content">
              {event.textContent && <StructuredContentDefault content={event.textContent} />}
            </div>
            <div className="col-lg-4">documents</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const EventQuery = graphql`
  query EventById($id: String) {
    event: datoCmsEvent(id: { eq: $id }) {
      title
      image {
        alt
        gatsbyImageData(width: 602, height: 401)
        url
      }
      tags {
        ... on DatoCmsTagEvent {
          title
          id
          color
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
