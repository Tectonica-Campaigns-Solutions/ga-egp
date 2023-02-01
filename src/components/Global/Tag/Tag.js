import React from 'react';
import Link from '../Link';

import './index.scss';

const Tag = ({ title, bgColor = '', slug = null }) => {
  const url = slug ? `/news/${slug}` : null;

  return (
    <Link to={url} className={`tag ${bgColor}`}>
      {title}
    </Link>
  );
};

export default Tag;
