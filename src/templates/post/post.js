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

const Post = ({ pageContext, location, data: { page, breadcrumb, favicon, siteTitle } }) => {
  const { seo, title, date, image, authors = [], textContent, tags = [], oldNid } = page;

  return (
    <Layout>
      <SeoDatoCms seo={seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={title}
        context={pageContext}
        location={location}
        date={date}
        breadcrumb={breadcrumb}
        breadcrumbDetail={title}
        isDetailView
      />

      <div className="container">
        <div className="post-detail">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {image && (
                <div className="post-main-image">
                  <ImageWrapper image={image} />
                </div>
              )}

              {isArray(authors) && (
                <div className="authors-list row gy-4">
                  {authors.map((author) => (
                    <div className="col-lg-6" key={author.id}>
                      <AuthorCard author={author} />
                    </div>
                  ))}
                </div>
              )}

              {textContent && (
                <div className={`post-text-content ${oldNid ? 'importer-post' : ''}`}>
                  <StructuredContentDefault content={textContent} />
                </div>
              )}

              {isArray(tags) && (
                <div className="new-tags">
                  {tags.map((tag) => (
                    <Tag key={tag.id} title={tag.title} />
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
  query PostById($id: String, $menuPos: String) {
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
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
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
      oldNid
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
