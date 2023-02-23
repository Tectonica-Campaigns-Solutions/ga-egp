import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CardUpdate from '../../Global/CardUpdate/CardUpdate';
import Section from '../../Global/Section/Section';
import { isArray } from '../../../utils';

const LatestUpdates = ({ block }) => {
  const { title, link } = block;

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
        <Section title={title} link={link} extraClassNames="gy-5">
          {latestsPosts.map((post) => (
            <div className="col-lg-4 col-md-6" key={post.id}>
              <CardUpdate post={post} />
            </div>
          ))}
        </Section>
      )}
    </>
  );
};

export default LatestUpdates;
