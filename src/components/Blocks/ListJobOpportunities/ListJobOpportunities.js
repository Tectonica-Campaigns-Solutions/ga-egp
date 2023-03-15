import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import React from 'react';
import { isArray } from '../../../utils';
import JobOpportunityCard from '../../Global/JobOpportunityCard/JobOpportunityCard';

const ListJobOpportunities = () => {
  const {
    allDatoCmsJobOpportunity: { nodes: jobs },
  } = useStaticQuery(graphql`
    query {
      allDatoCmsJobOpportunity {
        nodes {
          id
          title
          location
          description
          isRemote
        }
      }
    }
  `);

  if (!isArray(jobs)) {
    return null;
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
