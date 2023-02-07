import * as React from 'react';
import { pathToModel, isActiveTrail } from '../../../utils';
import Link from '../Link';

import './index.scss';

const InnerNavigation = ({ location, innerMenu }) => {
  const navLinks = innerMenu.navigationItems;

  return (
    <div className="inner-navigation">
      <div className="container">
        <div className="items py-4">
          {navLinks.map((item) => {
            const link = pathToModel(item.mainLink.content.model.apiKey, item.mainLink.content.slug);
            const active = isActiveTrail(location?.pathname, link);

            return (
              <div className="item" key={item.id}>
                <Link className={`link-item ${active ? 'active' : ''}`} to={link}>
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
