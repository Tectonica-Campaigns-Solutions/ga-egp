import React from 'react';
import Link from '../Link';

import './index.scss';

const Tag = ({ basePath, title, bgColor = 'primary-darker-green', slug = null }) => {
   
  const url = slug ? `${basePath}${slug}` : null;

  return (
    <Link to={url} className={`tag ${bgColor}`}>
      {title}
    </Link>
  );
};

export default Tag;
