import React from 'react';
import { pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

function SidebarNav({ menu, location }) {
  const currentPathname = location.pathname;

  return (
    <div className="sidebar-nav">
      {menu.map((item) => {
        const path = pathToModel('position', item.node.slug);
        const isActivePath = currentPathname?.includes(path);

        return (
          <div className={`sidebar-item ${isActivePath ? 'active' : ''}`}>
            <Link to={path}>{item.node.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarNav;
