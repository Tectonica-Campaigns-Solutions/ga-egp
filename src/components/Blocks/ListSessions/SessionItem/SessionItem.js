import * as React from 'react';
import timeIcon from '../../../Icons/time.svg';

import * as styles from './index.module.scss';

const SessionItem = ({ item, handleSession }) => {
  // console.log(item);
  const { id, title, time, sessionType } = item;

  return (
    <div className={`row ${styles.session_item}`} style={{ backgroundColor: sessionType?.color?.hex }}>
      <div className={`col-4 ${styles.time}`}>
        <img src={timeIcon} alt="Time session" />
        <span>{time}</span>
      </div>

      <div className="col">
        <h3 className={styles.title} onClick={() => handleSession(id)}>
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SessionItem;
