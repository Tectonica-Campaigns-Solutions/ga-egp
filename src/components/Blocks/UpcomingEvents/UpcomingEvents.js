import React from 'react';
import CardEvent from '../../Global/CardEvent/CardEvent';
import EventDivider from '../../Global/CardEvent/EventDivider';
import Section from '../../Global/Section/Section';

const UpcomingEvents = ({}) => {
  return (
    <Section title="Upcoming Events" linkLabel="See all EVENTS →" bgColor="section-green">
      <CardEvent
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
      />
    </Section>
  );
};

export default UpcomingEvents;
