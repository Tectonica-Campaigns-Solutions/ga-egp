import React from 'react';
import Link from '../Link';
import { pathToModel } from '../../../utils';

import * as styles from './breadcrumb.module.scss';

const Breadcrumb = ({ items = null }) => {
  const getItemsReversed = () => {
    const cloneItems = structuredClone(items);
    const slugs = getTitlesRecursive(cloneItems, []);

    return slugs.reverse();
  };

  const getTitlesRecursive = (item, slugs = []) => {
    if (item.title) {
      slugs.push({ title: item.title, content: item?.content });
    }

    if (item.treeParent) {
      return getTitlesRecursive(item.treeParent, slugs);
    }

    return slugs;
  };

  const renderSeparator = (index) => {
    if (index === 0) {
      return null;
    }
    return <span>/</span>;
  };

  // TODO
  const isActiveLink = false;

  return (
    <div className={styles.egpBreadcrumb} data-datocms-noindex>
      <ul>
        {getItemsReversed().map((item, index) => (
          <li key={index}>
            <Link
              to={item.content ? pathToModel(item.content.model, item.content.slug) : null}
              className={`${isActiveLink ? 'active' : ''}`}
            >
              {renderSeparator(index)}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
