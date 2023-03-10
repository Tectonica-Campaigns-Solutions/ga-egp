import React from 'react';
import Section from '../../Global/Section/Section';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { isArray } from '../../../utils';
import EventList from '../../Global/EventList/EventList';
import Button from '../../Global/Button/Button';

import * as styles from './event.module.scss';

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

  const highlightEvents = block?.highlightedEvents ? block.highlightedEvents : nextEvents;
  const globalLink = block?.link ? block.link : null;

  return (
    <Section title="Upcoming Events" link={globalLink} bgColor="section-green">
      {isArray(highlightEvents) && <EventList events={highlightEvents} />}

      <div className={styles.mobileInfoBtn}>
        <Button label={'See all EVENTS  →'} />
      </div>
    </Section>
  );
};

export default UpcomingEvents;
