import * as React from 'react';
import { useState } from 'react';
import { pathToModel, isActiveTrail } from '../../../utils';
import Link from '../Link';
import plusIcon from '../../Icons/plus.svg';

import './index.scss';

const InnerNavigation = ({ location, linkParent = null, innerMenu, allMenu }) => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navLinks = innerMenu?.treeChildren || [];

  // Filter links by 'hide' field and sort by order
  const navLinksOrdered = navLinks
    .filter((link) => !link.hideInInnerNavigation)
    .sort(function (a, b) {
      return a.position - b.position;
    });

  return (
    <div className="inner-navigation" data-datocms-noindex>
      <div className="container">
        <div className={`items py-4 ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinksOrdered.map((item, index) => {
            const link = pathToModel(item.content?.model?.apiKey, item.content?.slug);
            const active = isActiveTrail(location?.pathname, link);

            const parentActive = item.title === linkParent?.title;
            const children = allMenu.nodes.filter(el => el.id == item.id )[0]
            const itemsChildrenMobile = children.treeChildren.map(item => <div>{item.title}</div>)
     
            return (
              <div className={`item ${active || parentActive ? 'active' : ''}`} key={item.id}>
                <Link className="link-item" to={link}>
                  {item.title}
                </Link>
                {
                  itemsChildrenMobile && itemsChildrenMobile.length > 0 && <ul className="d-block d-lg-none">
                    { itemsChildrenMobile }
                  </ul>
                }

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
