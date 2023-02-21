import React from 'react';
import remoteIcon from '../../Icons/remote.svg';
import locationIcon from '../../Icons/location.svg';

import * as styles from './joblocation.module.scss';

const JobLocation = ({ isRemote, location }) => {
  return (
    <div className={styles.location}>
      <img src={isRemote ? remoteIcon : locationIcon} alt="location icon" />
      <span>{isRemote ? 'Remote' : location}</span>
    </div>
  );
};

export default JobLocation;
