import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

const Link = ({ to, children, ...rest }) => {
  // check for string in case link recieve hardoced link on templates ex: logo
  if (to?.content?.slug || typeof to === 'string') {
    return (
      <GatsbyLink
        to={`${to?.content?.slug ? '/' + to?.content?.slug : to}`}
        {...rest}
        activeClassName="nav-active-item"
      >
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={to?.url ?? to} {...rest}>
      {children}
    </a>
  );
};

export default Link;
