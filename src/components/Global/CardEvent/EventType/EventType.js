import React from 'react';
import './index.scss';

const EventType = ({ type }) => {
  return (
    <span className="event-type">
      <img src={type.icon.url} alt="Event type icon" />
      {type.title}
    </span>
  );
};

export default EventType;
