import React from 'react';
import Link from '../Link';
import { isActiveTrail, pathToModel } from '../../../utils';
import activeIcon from '../../Icons/right_arrow.svg';

import './index.scss';

function SidebarNav({ menu, location, landing }) {
  if (landing) {
    const newMenu = [...menu];
    newMenu.unshift(landing);
    menu = newMenu;
  }

  const menuOrdered = menu.sort(function (a, b) {
    return a.position - b.position;
  });

  return (
    <div className="sidebar-nav" data-datocms-noindex>
      {menuOrdered.map((item) => {
        const currentPathname = location ? location?.pathname : null;

        const slug = item.slug || item.content?.slug;
        const maybeApiKey = item.model?.apiKey || item.content?.model?.apiKey;

        const path = pathToModel(maybeApiKey, slug);
        const isActivePath = isActiveTrail(currentPathname, path);

        return (
          <div className={`sidebar-item ${isActivePath ? 'active' : ''}`} key={item.id}>
            <Link to={path}>
              {isActivePath ? <img src={activeIcon} alt={'Active icon'} /> : null}
              {item.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarNav;
