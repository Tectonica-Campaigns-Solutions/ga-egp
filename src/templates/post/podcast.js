import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import { isArray } from '../../utils';
import Tag from '../../components/Global/Tag/Tag';
import SeoDatoCMS from '../../components/SeoDatoCms';

import './index.scss';

const Postcast = ({ pageContext, location, data: { page } }) => {
  return (
    <Layout>
      <HeroPage title={page.title} context={pageContext} location={location} date={page.date} isDetailView />

      <div className="container">
        <div className="post-detail">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {page.image && <ImageWrapper image={page.image} />}

              {page.textContent && <StructuredContentDefault content={page.textContent} />}

              {isArray(page.tags) && (
                <div className="new-tags">
                  {page.tags.map((tag) => (
                    <Tag title={tag.title} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ data: { page } }) => <SeoDatoCMS page={page} />;

export const PodcastQuery = graphql`
  query PodcastById($id: String) {
    page: datoCmsPodcast(id: { eq: $id }) {
      id
      title
      slug
      image {
        gatsbyImageData(width: 985, height: 656)
        alt
        title
      }
      date(formatString: "D MMM Y")
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      seo {
        title
        description
      }
      textContent {
        value
        blocks {
          ... on DatoCmsAcordion {
            __typename
            id: originalId
            items {
              title
              text
            }
          }
          ... on DatoCmsEmbedAudio {
            __typename
            id: originalId
            url
          }
        }
      }
      tags {
        ... on DatoCmsTagNews {
          title
          id
          slug
        }
      }
    }
  }
`;

export default Postcast;
