import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import * as styles from './heropage.module.scss';

function HeroPage({
  title,
  context = null,
  location = null,
  date = null,
  isDetailView = false,
  parentTitle = null,
  currentId = null,
  breadcrumb = null,
}) {
  return (
    <div className={styles.heroPage}>
      <div className="container">
        <div>
          <Breadcrumb items={breadcrumb} />
        </div>

        <div>
          {date && <div className="date">{date}</div>}
          {parentTitle && <h2>{parentTitle}</h2>}
          {!parentTitle && <h1 className={`${isDetailView ? styles.sm : ''}`}>{title}</h1>}
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
