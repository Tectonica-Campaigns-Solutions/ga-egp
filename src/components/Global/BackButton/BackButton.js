import React from 'react';
import Link from '../Link';
import AnimateLink from '../Link/AnimateLink';
import iconClose from '../../Icons/icon_close.svg';

import './index.scss';

const BackButton = ({ location, animated = false }) => {
  const { pathname } = location;
  const FinalLink = animated ? AnimateLink : Link;

  const navigateBack = () => {
    const splittedUrl = pathname.split('/');
    const [, backUrl] = splittedUrl;
    return '/' + backUrl;
  };

  return (
    <FinalLink to={navigateBack()}>
      <div className="back-btn">
        <img src={iconClose} alt="Icon close" />
      </div>
    </FinalLink>
  );
};

export default BackButton;
