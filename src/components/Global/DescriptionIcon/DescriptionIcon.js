import * as React from 'react';

import * as styles from './index.module.scss';

const DescriptionIcon = ({ title, icon, text }) => {
  return (
    <div className={styles.descriptionContainer}>
      <div className={styles.title}>
        <img src={icon} alt="Icon" />
        <span>{title}</span>
      </div>

      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default DescriptionIcon;
