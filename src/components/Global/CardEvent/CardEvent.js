import React from "react";
import Button from "../Button/Button";
import ImageWrapper from "../Image/ImageWrapper";
import Tag from "../Tag/Tag";
import EventDate from "./EventDate/EventDate";
import EventTag from "./EventTag/EventTag";

import "./index.scss";

const CardEvent = ({ day, hour, image, title, description, slug }) => {
  return (
    <article className="card-event row align-items-center divider">
      <div className="col-md-2">
        <EventDate day={day} hour={hour} />
      </div>

      <div className="col-md-8 content">
        {image && (
          <div className="img">
            <ImageWrapper image={image} />
          </div>
        )}

        <div className="information">
          <div className="meta">
            <EventTag title="virtual" />
            <Tag title="MEMBER PARTIES" />
          </div>

          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="col-md-2">
        <Button label="Learn more" url={slug} />
      </div>
    </article>
  );
};

export default CardEvent;
