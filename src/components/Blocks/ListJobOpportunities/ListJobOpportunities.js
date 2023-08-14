import React from 'react';
import { isArray } from '../../../utils';
import JobOpportunityCard from '../../Global/JobOpportunityCard/JobOpportunityCard';

const ListJobOpportunities = ({values}) => {
  const jobs = values.nodes
  if (!isArray(jobs)) {
    return (
      <div className="container my-5">
        <h3
          style={{
            fontFamily: 'Jaldi',
            fontStyle: 'normal',
            fontWeight: 800,
            fontSize: '31px',
            lineHeight: '110%',
            color: 'var(--egp-darker-green)',
          }}
        >
          There are no positions at the moment.
        </h3>
      </div>
    );
  }

  return (
    <div className="container pt-5">
      {jobs.map((job) => (
        <JobOpportunityCard job={job} key={job.id} />
      ))}
    </div>
  );
};

export default ListJobOpportunities;
