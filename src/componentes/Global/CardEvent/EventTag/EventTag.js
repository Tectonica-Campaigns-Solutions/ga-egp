import React from "react";
import tagIcon from "../../../Icons/event-tag-icon.svg";

import "./index.scss";

const EventTag = ({ title }) => {
  return (
    <span className="event-tag">
      <img src={tagIcon} alt="Event tag icon" />
      {title}
    </span>
  );
};

export default EventTag;
