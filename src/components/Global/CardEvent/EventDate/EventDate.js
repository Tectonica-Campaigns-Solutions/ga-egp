import React from 'react';
import './index.scss';

const EventDate = ({ day, hour, color }) => {
  return (
    <div className={`event-date secondary-${color}`}>
      <h4>{day}</h4>
      {hour && <span>{hour}</span>}
    </div>
  );
};

export default EventDate;
