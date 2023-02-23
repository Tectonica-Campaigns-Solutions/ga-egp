import React from 'react';
import { pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

function SidebarNav({ menu, location }) {
  const currentPathname = location ? location?.pathname : null;

  return (
    <div className="sidebar-nav">
      {menu.map((item, index) => {
        const slug = item.slug || item.content?.slug;
        const maybeApiKey = item.model?.apiKey || item.content?.model?.apiKey;

        const path = pathToModel(maybeApiKey, slug);

        const isActivePath = currentPathname ? currentPathname.includes(slug) : false;

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
