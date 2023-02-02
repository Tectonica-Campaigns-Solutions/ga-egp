import React from 'react';
import Section from '../../Global/Section/Section';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { isArray } from '../../../utils';
import EventList from '../../Global/EventList/EventList';

const UpcomingEvents = ({ block }) => {
  const nextEvents = useStaticQuery(graphql`
    query {
      allDatoCmsEvent {
        edges {
          node {
            title
          }
        }
      }
    }
  `);

  const highlightEvents = block.highlightedEvents ? block.highlightedEvents : nextEvents;
  const globalLink = block.link ? block.link : null;

  console.log({ nextEvents, highlightEvents });

  return (
    <Section title="Upcoming Events" linkLabel={globalLink} bgColor="section-green">
      {isArray(highlightEvents) && <EventList events={highlightEvents} />}
    </Section>
  );
};

export default UpcomingEvents;
