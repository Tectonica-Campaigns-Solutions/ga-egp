import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import * as styles from './herocustom.module.scss';

function HeroCustom({
  title,
  ctas = null,
  imageHeader = null,
  description = null,
  context = null,
  location = null,
  date = null,
  isDetailView = false,
  parentTitle = null,
  breadcrumb = null,
  bgColor = null,
}) {
  return (
    <div className={`${styles.heroCustom} section-${bgColor}`} style={{ backgroundImage: `url(${imageHeader?.url})` }}>
      <div>
        {breadcrumb && (
          <div className="container">
            <Breadcrumb items={breadcrumb} textWhite />
          </div>
        )}

        <div>
          <div className="container">
            <div className="row">
              <div className={ctas && ctas.length > 0 ? 'col-lg-6' : 'col-12'}>
                {date && <div className="date">{date}</div>}
                {parentTitle && <h2>{parentTitle}</h2>}
                {!parentTitle && <h1 className={`${isDetailView ? 'sm' : ''}`}>{title}</h1>}
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              {ctas && (
                <div className="col-lg-6">
                  {ctas.map((item) => (
                    <div>
                      {item.title} {item.url} {item.description}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCustom;
