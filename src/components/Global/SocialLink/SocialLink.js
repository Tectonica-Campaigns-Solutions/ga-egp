import React from 'react';
import Link from '../Link';
import iconLinkedin from '../../Icons/icon_linkedin.svg';
import iconTwitter from '../../Icons/icon_twitter.svg';
import iconFacebook from '../../Icons/icon_facebook.svg';
import iconFlickr from '../../Icons/icon_flickr.svg';
import iconIg from '../../Icons/icon_ig.svg';

import './index.scss';

const SocialMap = {
  linkedin: iconLinkedin,
  twitter: iconTwitter,
  facebook: iconFacebook,
  instagram: iconIg,
  flickr: iconFlickr,
};

const SocialLink = ({ name, url, iconWhite = false }) => {
  const socialImg = SocialMap[name];

  return (
    <Link to={url}>
      <img height={40} src={socialImg} alt={name} className={`${iconWhite ? 'white' : ''}`} />
    </Link>
  );
};

export default SocialLink;
