import React from 'react';
import Button from '../Button/Button';
import ImageWrapper from '../Image/ImageWrapper';
import Tag from '../Tag/Tag';
import EventDate from './EventDate/EventDate';
import EventTag from './EventTag/EventTag';

import './index.scss';

const CardEvent = ({ day, hour, image, title, description, slug, color, tag }) => {
  return (
    <article className={`card-event row color-${color}`}>
      <div className="col-lg-2 col-md-3 date">
        <EventDate day={day} hour={hour} />
      </div>

      <div className="col-lg-8 col-md-9 content">
        {image && (
          <div className="img">
            <ImageWrapper image={image} />
          </div>
        )}

        <div className="information">
          <div className="meta">
            <EventTag title="virtual" />
            <Tag title={tag} />
          </div>

          <h2>{title}</h2>
          <div
            dangerouslySetInnerHTML={{__html: description}}
          />
        </div>
      </div>

      <div className="col-lg-2 col-md-12">
        <Button label="Learn more" url={slug} />
      </div>
    </article>
  );
};

export default CardEvent;
