import * as React from 'react';
import * as styles from './index.module.scss';

const SessionType = ({ item }) => {
  return (
    <div className={styles.session_type}>
      <span style={{ backgroundColor: item.node.color.hex }} />
      <h4>{item.node.title}</h4>
    </div>
  );
};

export default SessionType;
