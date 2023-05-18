import * as React from 'react';
import * as styles from './session.module.scss';

const SessionDetail = ({ session }) => {
  const { title, time, sessionType } = session;

  console.log({ session });

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>

      <div className="col">
        <div className="4"></div>
        <div className="4"></div>
        <div className="4"></div>
      </div>
    </div>
  );
};

export default SessionDetail;
