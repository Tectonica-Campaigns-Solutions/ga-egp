import React from "react";
import "./index.scss";

const EventDate = ({ day, hour }) => {
  return (
    <div className="event-date">
      <h3>{day}</h3>
      <span>{hour}</span>
    </div>
  );
};

export default EventDate;
