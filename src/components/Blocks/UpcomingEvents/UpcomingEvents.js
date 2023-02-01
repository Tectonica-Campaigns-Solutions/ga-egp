import React from 'react';
import CardEvent from '../../Global/CardEvent/CardEvent';
import EventDivider from '../../Global/CardEvent/EventDivider';
import Section from '../../Global/Section/Section';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';

const UpcomingEvents = ({ block }) => {
  const nextEvents = useStaticQuery(graphql`
    query {
      allDatoCmsEvent{
        edges{
          node{
            title
          }
        }
      }
    }
  `);
  const highlightEvents = block.highlightedEvents ? block.highlightedEvents : nextEvents;
  const globalLink = block.link ? block.link : null;

  return (
    <Section title="Upcoming Events" linkLabel={globalLink} bgColor="section-green">
      {
        highlightEvents.map((item, index) => {
          const slug = `/events/${ item.slug }`
          return (<CardEvent
            key={ item.id }
            day={ item.date }
            hour="09:00 TO 18:00"
            title={ item.title }
            description={ item.summary }
            image={item.image ? item.image : null}
            slug={slug}
            color={item.tags.color}
            tag={item.tags.title}
            type={item.eventType}
        />)
        })
      }
      {/* <CardEvent
        day="10 JAN"
        hour="09:00 TO 18:00"
        title="GroenLinks Congress, Den Bosch, Netherlands"
        description="Lorem ipsum dolor sit amet consectetur. Sed ac auctor tristique
            mauris porttitor sodales adipiscing. Amet imperdiet cras nam
            pulvinar nulla nam. Magna mi sollicitudin consectetur ipsum. Tempor
            at pharetra sit eget convallis aenean ut at. Vestibulum lorem varius
            eget cursus mauris."
        image={{
          url: 'https://www.datocms-assets.com/87481/1672133611-madhu-shesharam-kqzzcvyewvk-unsplash.jpg?auto=format',
        }}
      />

      <EventDivider />

      <CardEvent
        day="10 JAN"
        hour="09:00 TO 18:00"
        title="LMP - Magyarország Zöld Partija Congress, Budapest"
        description="Lorem ipsum dolor sit amet consectetur. Sed ac auctor tristique
            mauris porttitor sodales adipiscing. Amet imperdiet cras nam
            pulvinar nulla nam. Magna mi sollicitudin consectetur ipsum. Tempor
            at pharetra sit eget convallis aenean ut at. Vestibulum lorem varius
            eget cursus mauris."
      /> */}
    </Section>
  );
};

export default UpcomingEvents;
