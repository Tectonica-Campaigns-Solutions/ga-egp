import React from 'react';
import Button from '../Button/Button';
import remoteIcon from '../../Icons/remote.svg';
import locationIcon from '../../Icons/location.svg';

import * as styles from './job.module.scss';

const JobOpportunityCard = ({ job, btnLabel = 'see more and apply' }) => {
  const { title, location, isRemote = false, description } = job;

  return (
    <div className={styles.jobDetail}>
      <div className={styles.location}>
        <img src={isRemote ? remoteIcon : locationIcon} alt="location icon" />
        <span>{isRemote ? 'Remote' : location}</span>
      </div>

      <h3>{title}</h3>
      <div className={styles.jobDescription} dangerouslySetInnerHTML={{ __html: description }} />

      <Button label={btnLabel} />
    </div>
  );
};

export default JobOpportunityCard;
