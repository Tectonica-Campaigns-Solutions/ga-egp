import React from 'react';
import { isArray } from '../../../utils';
import SocialLink from './SocialLink';

import './index.scss';

const SocialLinkList = ({ links, iconWhite = false }) => {
  if (!isArray(links)) {
    return null;
  }

  return (
    <div className="social-list">
      {links.map((link) => (
        link.url && <SocialLink key={link.url} name={link.socialNetwork} url={link.url} iconWhite={iconWhite} />
      ))}
    </div>
  );
};

export default SocialLinkList;
