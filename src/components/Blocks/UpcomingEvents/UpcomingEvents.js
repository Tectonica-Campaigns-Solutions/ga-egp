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
      allDatoCmsEvent(sort: {date: ASC}){
        edges {
          node {
            ...EventCard
          }
        }
      }
    }
  `);

  const fulldate = new Date()
  const today = fulldate.toISOString().split('T')[0]
  const timestamp = (new Date(today)).getTime()

  const nextEventsFuture = nextEvents.allDatoCmsEvent.edges.filter(item => {
    return (new Date(item.node.fullDate)).getTime() > timestamp}
  ).slice(0,3)
  

  const highlightEvents = block?.highlightedEvents && block.highlightedEvents.length > 0 ? block.highlightedEvents : nextEventsFuture;
  const linkAll = block.linkToAll ? block.linkToAll[0] : null;

  return (
    <Section key={id} title="Upcoming Events" link={linkAll} bgColor="section-green">
      <EventList events={highlightEvents} />

      {  linkAll && <div className={styles.mobileInfoBtn}>
          <Button url={getCtaUrl(linkAll.link)} label={linkAll.link?.label ? linkAll.link.label : linkAll.link.content.label } isPrimary={true} />
        </div>
      }
    </Section>
   
  );
};

export default UpcomingEvents;
