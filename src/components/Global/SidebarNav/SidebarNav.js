import React from 'react';
import { isActiveTrail, pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

function SidebarNav({ menu, location }) {
  return (
    <div className="sidebar-nav" data-datocms-noindex>
      {menu.map((item) => {
        const currentPathname = location ? location?.pathname : null;

        const slug = item.slug || item.content?.slug;
        const maybeApiKey = item.model?.apiKey || item.content?.model?.apiKey;

        const path = pathToModel(maybeApiKey, slug);

        const isActivePath = isActiveTrail(currentPathname, path);

        return (
          <div className={`sidebar-item ${isActivePath ? 'active' : ''}`} key={item.id}>
            <Link to={path}>{item.title}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default SidebarNav;
