import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CardUpdate from '../../Global/CardUpdate/CardUpdate';
import Section from '../../Global/Section/Section';
import { isArray } from '../../../utils';

const LatestUpdatesByTag = ({ title, tagId, link }) => {
  const {
    allDatoCmsPost: { nodes: latestsPosts },
  } = useStaticQuery(graphql`
    query latestPost {
      allDatoCmsPost(limit: 30) {
        nodes {
          ...PostCard
        }
      }
    }
  `);

  if (!tagId) return null;

  // TODO: Improve this, we can not interpolate values on query
  const filteredPosts = latestsPosts.filter((p) => p.tags.find((t) => t.id === tagId)).slice(0, 2);

  return (
    <>
      {isArray(filteredPosts) && (
        <Section title={title} link={link} extraClassNames="gy-5">
          {filteredPosts.map((post) => (
            <div className="col-lg-6 col-md-6" key={post.id}>
              <CardUpdate post={post} />
            </div>
          ))}
        </Section>
      )}
    </>
  );
};

export default LatestUpdatesByTag;
