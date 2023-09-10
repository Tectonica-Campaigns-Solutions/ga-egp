import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import CardUpdate from '../../Global/CardUpdate/CardUpdate';
import Section from '../../Global/Section/Section';
import { getCtaUrl, isArray } from '../../../utils';
import Button from '../../Global/Button/Button';

import * as styles from './styles.module.scss';

const LatestUpdates = ({ block, items = []}) => {
  const { title, linkToAll } = block;
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
  const linkAll = linkToAll ? linkToAll[0] : null
  return (
    <>
      {isArray(finalItems) && (
        <Section title={title} link={linkAll} extraClassNames="gy-4 gy-xl-0">
          {finalItems.map((post) => (
            <div
              className={`${customItems ? 'col-xl-6 col-lg-12 col-sm-12' : 'col-xl-4 col-lg-6 col-md-6 col-sm-12'}`}
              key={post.node.id}
            >
              <CardUpdate post={post.node} />
            </div>
          ))}

          {linkAll && (
            <div className={styles.mobileInfoBtn}>
              <Button url={getCtaUrl(linkAll.link)} label={linkAll.link?.label ? linkAll.link.label : linkAll.link.content.label } isPrimary={true} />
            </div>
          )}
        </Section>
      )}
    </>
  );
};

export default LatestUpdates;
