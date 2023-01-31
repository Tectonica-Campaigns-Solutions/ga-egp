import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import EventTag from '../../components/Global/CardEvent/EventTag/EventTag';
import Button from '../../components/Global/Button/Button';

import './index.scss';
import Link from '../../components/Global/Link';

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
                <span>{event.date} | {event.time}</span>
              </div>

              <h1>{event.title}</h1>
              {/* <Button label="Register" /> */}
              {
                event.registerLink && <Link to={event.registerLink.url}>{event.registerLink.label }</Link>
              }
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 content">
              {event.textContent && <StructuredContentDefault content={event.textContent} />}
            </div>
            <div className="col-lg-4">
              {
                event.documents.map(item => {
                  return(
                    <div>
                      <Link to={ item.document.url }>{ item.language }</Link>
                    </div>
                  )
                })
              }
            </div>
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
      time
      date(formatString: "D MMM")
      registerLink{
        ... on DatoCmsGlobalLink{
          label
          url
        }
      }
      tags {
        ... on DatoCmsTagEvent {
          title
          id
          color
        }
      }
      documents{
        ... on DatoCmsDocument{
          language
          document{
            url
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
