import React from 'react';
import Section from '../../Global/Section/Section';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import { getCtaUrl, isArray } from '../../../utils';
import EventList from '../../Global/EventList/EventList';
import Button from '../../Global/Button/Button';

import * as styles from './event.module.scss';

const UpcomingEvents = ({ id, block }) => {
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
    <Section key={id} title="Upcoming Events" link={globalLink} bgColor="section-green">
      {isArray(highlightEvents) && <EventList events={highlightEvents} />}

      <div className={styles.mobileInfoBtn}>
        <Button url={getCtaUrl(globalLink)} label={globalLink?.label} isPrimary={false} customVariant="light" />
      </div>
    </Section>
  );
};

export default UpcomingEvents;
