import { navigate } from 'gatsby';
import React from 'react';

const BackButton = ({ location }) => {
  const { pathname } = location;

  const navigateBack = () => {
    const splittedUrl = pathname.split('/');
    const [_, backUrl] = splittedUrl;

    navigate('/' + backUrl);
  };

  return <div onClick={navigateBack}>X</div>;
};

export default BackButton;
