import React from 'react';
import { pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

function SidebarNav({ menu, location }) {
  const currentPathname = location ? location?.pathname : null;

  return (
    <div className="sidebar-nav">
      {menu.map((item) => {
        // TODO Fix normalize data
        const el = item?.node ? item.node : item;
        const path = '/positions'
        const isActivePath = currentPathname ? currentPathname?.includes(path) : false;

        return (
          <div className={`sidebar-item ${isActivePath ? 'active' : ''}`}>
            <Link to={path}>{el.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarNav;
