import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Link from '../Link';
import backBtn from '../../Icons/backbtn.svg';

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
  return (
    <div className={styles.heroPage}>
      <div className="container">
        {breadcrumb && (
          <div>
            <Breadcrumb items={breadcrumb} breadcrumbDetail={breadcrumbDetail} />
          </div>
        )}

        {backButton && (
          <Link className={`${styles.backBtn}`} href={backButton}>
            <img src={backBtn} alt="Back button icon" />
            Back to search
          </Link>
        )}

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
