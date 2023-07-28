import React from 'react';
import Button from '../Button/Button';
import JobLocation from '../JobLocation/JobLocation';
import { pathToModel } from '../../../utils';

import * as styles from './job.module.scss';

const JobOpportunityCard = ({ job, btnLabel = 'see more and apply' }) => {
  const { title, location, isRemote = false, description, model, slug } = job;

  return (
    <div className={styles.jobDetail}>
      <JobLocation isRemote={isRemote} location={location} />

      <h3>{title}</h3>
      <div
        className={`${styles.jobDescription} link-and-list-styles`}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <Button label={btnLabel} url={pathToModel(model.apiKey, slug)} />
    </div>
  );
};

export default JobOpportunityCard;
