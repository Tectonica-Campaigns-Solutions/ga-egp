import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CardUpdate from '../../Global/CardUpdate/CardUpdate';
import Section from '../../Global/Section/Section';
import { isArray } from '../../../utils';

const LatestUpdates = ({ block }) => {
  const { title, link } = block;

  const latestsPosts = useStaticQuery(graphql`
    query LatestPosts {
      allDatoCmsPost(limit: 3){
        edges{
          node{
            ...PostCard
          }
        }
     }
    }
  `)

  return (
    <>
      {isArray(latestsPosts.edges) && (
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
