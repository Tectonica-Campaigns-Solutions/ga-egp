import Link from '../../Global/Link';
import React from 'react';
import { isArray } from '../../../utils';

import './index.scss';

const SocialFollow = ({ block }) => {
  const { title, links } = block;
  return (
    <div className="social-follow">
      <div className="container">
        <h2>{title}</h2>

        {isArray(links) && (
          <div className="links">
            {links.map((link, index) => (
              <Link to={link.mainLink?.url} key={index} target="_blank">
                <img src={link.icon?.url} alt={link.label} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialFollow;
