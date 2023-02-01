import React from 'react';
import Button from '../Button/Button';
import ImageWrapper from '../Image/ImageWrapper';
import Link from '../Link';
import Tag from '../Tag/Tag';
import EventDate from './EventDate/EventDate';
import EventType from './EventType/EventType';

import './index.scss';

const CardEvent = ({ day, hour, image, title, description, slug, color, tag, type }) => {
  return (
    <article className={`card-event row`}>
      <div className="col-lg-2 col-md-3 date">
        <EventDate day={day} hour={hour} color={color} />
      </div>

      <div className="col-lg-8 col-md-9 content">
        {image && (
          <div className="img">
            <Link to={slug}>
              <ImageWrapper image={image} />
            </Link>
          </div>
        )}

        <div className="information">
          <div className="meta">
            <EventType type={type} />
            <Tag title={tag} bgColor={`secondary-${color}`} />
          </div>

          <Link to={slug}>
            <h2>{title}</h2>
          </Link>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>

      <div className="col-lg-2 col-md-12">
        <Button label="Learn more" url={slug} />
      </div>
    </article>
  );
};

export default CardEvent;
