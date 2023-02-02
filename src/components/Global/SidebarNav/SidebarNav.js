import React from 'react';
import { pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

function SidebarNav({ menu, location }) {
  const currentPathname = location ? location?.pathname : null;

  return (
    <div className="sidebar-nav">
      {menu.map((item, index) => {
        const path = pathToModel(item.model?.apiKey, item.slug)
        const isActivePath = currentPathname ? currentPathname?.includes(path) : false;

        return (
          <div className={`sidebar-item ${index !== 0 && isActivePath ? 'active' : ''}`}>
            <Link to={path}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarNav;
