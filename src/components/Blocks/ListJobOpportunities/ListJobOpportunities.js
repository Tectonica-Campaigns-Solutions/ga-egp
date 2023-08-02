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
          slug
          model {
            apiKey
          }
        }
      }
    }
  `);

  if (!isArray(jobs)) {
    return (<div className="container my-5"><h3>There are no positions at the moment.</h3></div>);
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
