import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import AuthorCard from '../../components/Global/AuthorCard/AuthorCard';
import { isArray } from '../../utils';
import Tag from '../../components/Global/Tag/Tag';
import SeoDatoCms from '../../components/SeoDatoCms';
import LatestUpdates from '../../components/Blocks/LatestUpdates/LatestUpdates';

import './index.scss';

const Post = ({ pageContext, location, data: { page, favicon, siteTitle } }) => {
  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage title={page.title} context={pageContext} location={location} date={page.date} isDetailView />

      <div className="container">
        <div className="post-detail">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {page.image && <ImageWrapper image={page.image} />}

              {isArray(page.authors) && (
                <div className="authors-list row gy-4">
                  {page.authors.map((author) => (
                    <div className="col-lg-6">
                      <AuthorCard author={author} key={author.id} />
                    </div>
                  ))}
                </div>
              )}

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

        <LatestUpdates block={{ title: 'Related News' }} />
      </div>
    </Layout>
  );
};

export const PostQuery = graphql`
  query PostById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    page: datoCmsPost(id: { eq: $id }) {
      id
      title
      slug
      image {
        gatsbyImageData(width: 985, height: 656)
        alt
        title
      }
      date(formatString: "D MMM Y")
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
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
        }
      }
      tags {
        ... on DatoCmsTagNews {
          title
          id
          slug
        }
      }
      authors {
        id
        name
        slug
        description
        jobPosition
        image {
          gatsbyImageData(width: 84, height: 84)
        }
      }
    }
  }
`;

export default Post;
