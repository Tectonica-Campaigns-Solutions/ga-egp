import React from 'react';
import ImageWrapper from '../Image/ImageWrapper';

import './index.scss';

const AuthorCard = ({ author }) => {
  const { jobPosition, image, name } = author;

  return (
    <div className="author-card">
      {image && <ImageWrapper image={image} />}

      <div>
        {name && <h4>{name}</h4>}

        {jobPosition && (
          <div className="description link-and-list-styles" dangerouslySetInnerHTML={{ __html: jobPosition }} />
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
