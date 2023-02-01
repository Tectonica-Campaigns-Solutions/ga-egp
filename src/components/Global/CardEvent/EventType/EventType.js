import React from 'react';
import './index.scss';

const EventType = ({ type }) => {
  const { icon = null, title } = type;
  return (
    <span className="event-type">
      {icon?.url && <img src={icon?.url} alt="Event type icon" />}
      {title && title}
    </span>
  );
};

export default EventType;
