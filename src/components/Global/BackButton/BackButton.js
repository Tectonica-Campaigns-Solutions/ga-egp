import React from 'react';
import CustomLink from '../Link';
import AnimateLink from '../Link/AnimateLink';
import iconClose from '../../Icons/icon_close.svg';
import { navigate } from 'gatsby';

import './index.scss';

const BackButton = ({ location, animated = false, defaultBack = false }) => {
  const { pathname } = location;
  const FinalLink = animated ? AnimateLink : CustomLink;

  const navigateBack = () => {
    const splittedUrl = pathname.split('/');
    const [, backUrl] = splittedUrl;
    return '/' + backUrl;
  };

  if (defaultBack) {
    return (
      <div
        className="back-btn"
        onClick={() => {
          if (defaultBack) {
            navigate(-1);
          }
        }}
      >
        <img src={iconClose} alt="Icon close" />
      </div>
    );
  }

  return (
    <FinalLink to={navigateBack()}>
      <div className="back-btn">
        <img src={iconClose} alt="Icon close" />
      </div>
    </FinalLink>
  );
};

export default BackButton;
