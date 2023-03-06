import React from 'react';
import { isActiveTrail, pathToModel } from '../../../utils';
import Link from '../Link';

import './index.scss';

function SidebarNav({ menu, location }) {
  const currentPathname = location ? location?.pathname : '';

  console.log({ menu });

  return (
    <div className="sidebar-nav" data-datocms-noindex>
      {menu.map((item, index) => {
        const slug = item.slug || item.content?.slug;
        const maybeApiKey = item.model?.apiKey || item.content?.model?.apiKey;

        const path = pathToModel(maybeApiKey, slug);

        console.log({ item, path });

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
