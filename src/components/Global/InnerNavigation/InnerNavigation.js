import * as React from 'react';
import { useState } from 'react';
import { pathToModel, isActiveTrail } from '../../../utils';
import Link from '../Link';
import plusIcon from '../../Icons/plus.svg';

import './index.scss';

const InnerNavigation = ({ location, innerMenu }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = innerMenu?.treeChildren || [];

  const navLinksOrdered = navLinks.sort(function (a, b) {
    return a.position - b.position;
  });

  return (
    <div className="inner-navigation" data-datocms-noindex>
      <div className="container">
        <div className={`items py-4 ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinksOrdered.map((item, index) => {
            const link = pathToModel(item.content?.model?.apiKey, item.content?.slug);
            const active = isActiveTrail(location?.pathname, link);

            return (
              <div className="item" key={item.id}>
                <Link className={`link-item ${active ? 'active' : ''}`} to={link}>
                  {item.title}
                </Link>

                {index === 0 && (
                  <span className="mobile-icon" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                    <img src={plusIcon} alt="Mobile toggle icon" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InnerNavigation;
