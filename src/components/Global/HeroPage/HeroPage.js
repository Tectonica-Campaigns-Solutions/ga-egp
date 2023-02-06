import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import * as styles from './heropage.module.scss';

function HeroPage({ title, context = null, location = null, date = null, isDetailView = false, parentTitle = null }) {
  return (
    <div className={styles.heroPage}>
      <div className="container">
        <div>
          <Breadcrumb
            items={[
              { title: 'Home', slug: '1' },
              { title: 'Positions', slug: '2' },
              { title: 'Another link', slug: '2' },
              { title: 'Extra link', slug: '2' },
            ]}
          />
        </div>

        <div>
          {date && <div className="date">{date}</div>}
          {parentTitle && <h2>{parentTitle}</h2>}
          {!parentTitle && <h1 className={`${isDetailView ? 'sm' : ''}`}>{title}</h1>}
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
