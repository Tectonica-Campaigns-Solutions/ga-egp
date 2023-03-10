import React from 'react';
import CardEvent from '../CardEvent/CardEvent';
import EventDivider from '../CardEvent/EventDivider';

const EventList = ({ events }) => {
  const eventsLength = events.length || 0;

  return (
    <>
      {events.map((e, index) => (
        <React.Fragment key={e.node?.id || e.id}>
          <CardEvent
            slug={`/events/${e.node?.slug || e.slug}`}
            title={e.node?.title || e.title}
            day={e.node?.date || e.date}
            hour={e.node?.time || e.time}
            color={e.node?.tags.color || e.tags.color}
            image={e.node?.image || e.image}
            tag={e.node?.tags.title || e.tags.title}
            type={e.node?.eventType || e.eventType}
            description={e.node?.summary || e.summary}
          />

          {eventsLength - 1 !== index && <EventDivider />}
        </React.Fragment>
      ))}
    </>
  );
};

export default EventList;
