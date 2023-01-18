import * as React from 'react';
import { pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

const InnerNavigation = ({ location, innerMenu }) => {
  const navLinks = innerMenu.navigationItems;

  return (
    <div className="inner-navigation">
      <div className="container">
        <div className="d-flex py-4">
          {navLinks.map((item) => {
            const link = pathToModel(item.mainLink.content.model.apiKey, item.mainLink.content.slug);

            return (
              <div className="pe-5">
                <Link className={`link-item ${location?.pathname === link + '/' ? 'active' : ''}`} to={link}>
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InnerNavigation;
