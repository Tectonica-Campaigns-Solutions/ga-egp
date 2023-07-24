import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CardUpdate from '../../Global/CardUpdate/CardUpdate';
import Section from '../../Global/Section/Section';
import { isArray } from '../../../utils';

const LatestUpdates = ({ block, items = [] }) => {
  const { title, link } = block;

  const latestsPosts = useStaticQuery(graphql`
    query LatestPosts {
      allDatoCmsPost(limit: 3, sort: { date: DESC }) {
        edges {
          node {
            ...PostCard
          }
        }
      }
    }
  `);

  const customItems = Array.isArray(items) && items.length > 0;
  const finalItems = customItems ? items : latestsPosts.allDatoCmsPost.edges;

  return (
    <>
      {isArray(finalItems) && (
        <Section title={title} link={link} extraClassNames="gy-5">
          {finalItems.map((post) => (
            <div className={`${customItems ? 'col-md-6' : 'col-lg-4 col-md-6'}`} key={post.node.id}>
              <CardUpdate post={post.node} />
            </div>
          ))}
        </Section>
      )}
    </>
  );
};

export default LatestUpdates;
