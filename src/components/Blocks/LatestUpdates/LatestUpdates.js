import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CardUpdate from '../../Global/CardUpdate/CardUpdate';
import Section from '../../Global/Section/Section';
import { isArray } from '../../../utils';

const LatestUpdates = ({ block }) => {
  const { title, linkLabel } = block;

  const {
    allDatoCmsPost: { nodes: latestsPosts },
  } = useStaticQuery(graphql`
    query latestPost {
      allDatoCmsPost(limit: 3) {
        nodes {
          ...PostCard
        }
      }
    }
  `);

  return (
    <>
      {isArray(latestsPosts) && (
        <Section title={title} link={{ label: linkLabel }}>
          {latestsPosts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <CardUpdate  post={post} />
            </div>
          ))}
        </Section>
      )}
    </>
  );
};

export default LatestUpdates;
