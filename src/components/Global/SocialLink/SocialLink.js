import React from 'react';
import Link from '../Link';
import iconLinkedin from '../../Icons/icon_linkedin.svg';
import iconTwitter from '../../Icons/icon_twitter.svg';

import './index.scss';

const SocialMap = {
  linkedin: iconLinkedin,
  twitter: iconTwitter,
};

const SocialLink = ({ name, url, iconWhite = false }) => {
  const socialImg = SocialMap[name];

  return (
    <Link to={url}>
      <img src={socialImg} alt={name} className={`${iconWhite ? 'white' : ''}`} />
    </Link>
  );
};

export default SocialLink;
