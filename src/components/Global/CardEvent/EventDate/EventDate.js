import React from "react";
import "./index.scss";

const EventDate = ({ day, hour }) => {
  return (
    <div className="event-date">
      <h4>{day}</h4>
      <span>{hour}</span>
    </div>
  );
};

export default EventDate;
