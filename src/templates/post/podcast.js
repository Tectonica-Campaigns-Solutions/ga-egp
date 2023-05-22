import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import { isArray } from '../../utils';
import Tag from '../../components/Global/Tag/Tag';
import SeoDatoCms from '../../components/SeoDatoCms';

import './index.scss';

const Podcast = ({ pageContext, location, data: { page, breadcrumb, favicon, siteTitle } }) => {

  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={page.title}
        context={pageContext}
        location={location}
        date={page.date}
        breadcrumb={breadcrumb}
        breadcrumbDetail={page.title}
        isDetailView
      />

      <div className="container">
        <div className="post-detail">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {page.image && <ImageWrapper image={page.image} />}

              {page.textContent && <StructuredContentDefault content={page.textContent} />}

              {isArray(page.tags) && (
                <div className="new-tags">
                  {page.tags.map((tag) => (
                    <Tag key={tag.id} title={tag.title} />
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

export const PodcastQuery = graphql`
  query PodcastById($id: String, $menuPos: String) {
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
          ... on DatoCmsEmbedAudio {
            __typename
            id: originalId
            iframeContent
            file {
              url
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
    }
  }
`;

export default Podcast;
