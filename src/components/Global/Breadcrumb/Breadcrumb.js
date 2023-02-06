import React from 'react';
import Link from '../Link';
import { isArray } from '../../../utils';

import * as styles from './breadcrumb.module.scss'

const Breadcrumb = ({ items }) => {
  if (!isArray(items)) return null;

  const isActiveLink = false;

  const renderSeparator = (index) => {
    if (index === 0) {
      return null;
    }
    return <span>/</span>;
  };

  return (
    <div className={styles.egpBreadcrumb}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <Link  to={item.slug} className={`${isActiveLink ? 'active' : ''}`}>
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
