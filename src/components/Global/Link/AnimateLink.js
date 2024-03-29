import React from 'react';
import { Link } from 'gatsby';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

const AnimateLink = ({ to, children = null }) => {
  return (
    <AniLink
      // paintDrip={false}
      // swipe={true}
      cover={true}
      // fade={false}
      direction="bottom"
      bg="#36845b"
      component={Link}
      to={to}
    >
      {children}
    </AniLink>
  );
};

export default AnimateLink;
