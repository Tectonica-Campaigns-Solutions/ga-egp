import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout'
import StructuredContentDefault from '../../components/StructuredContentDefault ';

import './index.scss';
import { GatsbyImage } from 'gatsby-plugin-image';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import EventTag from '../../components/Global/CardEvent/EventTag/EventTag';

function Event({ data: { event } }) {
  return (
    <Layout>
      <div className={`event-page color-${event.tags.color}`}>
        <div className="container">
          <div className="row">
              <div className="col-lg-6">
               { event.image && <ImageWrapper image={event.image}/> }
              </div>
              <div className="col-lg-6">
                <h1>{ event.title }</h1>
                <EventTag title={event.tags.title}/>
              </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6">
              {event.textContent && <StructuredContentDefault content={event.textContent} />}
            </div>
            <div className="col-lg-6">
               documents
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const EventQuery = graphql`
  query EventById($id: String) {
    event: datoCmsEvent(id: { eq: $id }) {
      title
      image{
        alt
        gatsbyImageData
        url
      }
      tags{
        ... on DatoCmsTagEvent{
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

export default Event