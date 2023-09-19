import React, { useEffect } from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { navigate } from 'gatsby';
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
  children = null,
  breadcrumbDetail = null,
  backButton = false
}) {
  useEffect(() => {
    console.log(document)
  }, [])
  return (
    <div className={styles.heroPage}>
      <div className="container">
        {breadcrumb && (
          <div>
            <Breadcrumb items={breadcrumb} breadcrumbDetail={breadcrumbDetail} />
          </div>
        )}

        {/* {
          backButton && <div className="mb-3" onClick={() => {console.log(document.referrer)}}>Back to search</div>
        } */}

        <div>
          {date && <div className={styles.heroDate}>{date}</div>}
          {parentTitle && <h2>{parentTitle}</h2>}
          {!parentTitle && <h1 className={`${styles.heroTitle} ${isDetailView ? styles.sm : ''}`}>{title}</h1>}

          {children}
        </div>
      </div>
    </div>
  );
}

export default HeroPage;
