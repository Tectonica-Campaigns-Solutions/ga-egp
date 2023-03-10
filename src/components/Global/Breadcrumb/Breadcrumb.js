import React from 'react';
import Link from '../Link';
import { pathToModel } from '../../../utils';

import * as styles from './breadcrumb.module.scss';

const Breadcrumb = ({ items = null, textWhite = false }) => {
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

  const finalItems = [{ title: 'Home', to: '/' }, ...getItemsReversed()];

  return (
    <div className={`${styles.egpBreadcrumb} ${textWhite ? styles.textWhite : null}`} data-datocms-noindex>
      <ul>
        {finalItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.content ? pathToModel(item.content.model, item.content.slug) : item ? item.to : null}
              className={`${finalItems.length - 1 === index ? styles.active : ''}`}
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
