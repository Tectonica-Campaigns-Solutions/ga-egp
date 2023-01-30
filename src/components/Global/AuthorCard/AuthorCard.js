import React from 'react';
import ImageWrapper from '../Image/ImageWrapper';

import './index.scss';

const AuthorCard = ({ author }) => {
  const { description, image, name } = author;

  return (
    <div className="author-card">
      {image && <ImageWrapper image={image} />}

      <div>
        {name && <h4>{name}</h4>}

        {/* TODO: Discuss text length... */}
        {/* {description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />} */}
      </div>
    </div>
  );
};

export default AuthorCard;
