import React from 'react';
import Button from '../Button/Button';
import JobLocation from '../JobLocation/JobLocation';

import * as styles from './job.module.scss';

const JobOpportunityCard = ({ job, btnLabel = 'see more and apply' }) => {
  const { title, location, isRemote = false, description } = job;

  return (
    <div className={styles.jobDetail}>
      <JobLocation isRemote={isRemote} location={location} />

      <h3>{title}</h3>
      <div className={styles.jobDescription} dangerouslySetInnerHTML={{ __html: description }} />

      <Button label={btnLabel} />
    </div>
  );
};

export default JobOpportunityCard;
