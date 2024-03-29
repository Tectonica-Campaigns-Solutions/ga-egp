import React from 'react';
import Link from '../Link';
import iconLinkedin from '../../Icons/icon_linkedin.svg';
import iconTwitter from '../../Icons/icon_twitter.svg';
import iconFacebook from '../../Icons/icon_facebook.svg';
import iconFlickr from '../../Icons/icon_flickr.svg';
import iconIg from '../../Icons/icon_ig.svg';
import iconTikTok from '../../Icons/icon_tiktok.svg';
import iconYoutube from '../../Icons/youtube-icon.svg';

import './index.scss';

const SocialMap = {
  linkedin: iconLinkedin,
  twitter: iconTwitter,
  facebook: iconFacebook,
  instagram: iconIg,
  flickr: iconFlickr,
  tiktok: iconTikTok,
  youtube: iconYoutube,
};

const SocialLink = ({ name, url, title = '', iconWhite = false, smallIcons = false }) => {
  const socialImg = SocialMap[name];
  let finalUrl = url;

  // if(name == 'twitter'){
  //   finalUrl = `https://twitter.com/${url}`
  // }else{
  //   finalUrl = url
  // }

  return (
    <Link to={finalUrl}>
      <img height={smallIcons ? 25 : 40} src={socialImg} alt={name} className={`${iconWhite ? 'white' : ''}`} />
      {title && <span className="title">{title}</span>}
    </Link>
  );
};

export default SocialLink;
