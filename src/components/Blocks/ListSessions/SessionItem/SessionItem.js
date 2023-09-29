import * as React from 'react';
import timeIcon from '../../../Icons/time.svg';
import locationIcon from '../../../../components/Icons/location.svg';
import * as styles from './index.module.scss';


const SessionItem = ({ item, handleSession }) => {
  console.log(item)
  const { id, title, time, sessionType, icon, room } = item;

  return (
    <div className={`row align-items-center ${styles.session_item}`} style={{ backgroundColor: sessionType?.color?.hex }} onClick={() => handleSession(id)}>
      <div className={`col-2 ${styles.time}`}>
        <img src={timeIcon} alt="Time session" />
        <span>{time}</span>
      </div>

      <div className="col d-flex align-items-center">
        { icon && <div className="pe-3"><img src={icon.url} width="25" height="25"/></div>}
        <h3 className={styles.title} >
          {title}
        </h3>
      </div>
      {
        room != '' && <div className="col-lg-2"><img src={locationIcon} className="pe-3"/>{ room }</div>
      }
    </div>
  );
};

export default SessionItem;
