import React from 'react';
import { isArray } from '../../../utils';
import SocialLink from './SocialLink';

import './index.scss';

const SocialLinkList = ({ links }) => {
  if (!isArray(links)) {
    return null;
  }

  return (
    <div className="social-list">
      {links.map((link) => (
        <SocialLink name={link.socialNetwork} url={link.url} />
      ))}
    </div>
  );
};

export default SocialLinkList;
