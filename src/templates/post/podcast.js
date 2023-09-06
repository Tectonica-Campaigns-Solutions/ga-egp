import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import { basePathTag, isArray } from '../../utils';
import Tag from '../../components/Global/Tag/Tag';
import SeoDatoCms from '../../components/SeoDatoCms';
import HeroPodcast from '../../components/Global/HeroPodcast/HeroPodcast';
import AuthorCard from '../../components/Global/AuthorCard/AuthorCard';
import EmbedAudio from '../../components/Blocks/EmbedAudio/EmbedAudio';
import TextHubspotForm from '../../components/Blocks/TextHubspotForm/TextHubsportForm';

import './index.scss';

const Podcast = ({ data: { page, breadcrumb, favicon, siteTitle } }) => {
  const basePath = basePathTag(page.model.apiKey);

  return (
    <Layout navbarWhite>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPodcast
        title={page.title}
        date={page.date}
        breadcrumb={breadcrumb}
        breadcrumbDetail={page.title}
        image={page.image}
      />

      <div className="container">
        <div className="post-detail podcast">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {page.audioUrl && <EmbedAudio file={page.audioUrl[0].file} />}

              {isArray(page.authors) && (
                <div className="authors-list row gy-4">
                  {page.authors.map((author) => (
                    <div className="col-lg-6" key={author.id}>
                      <AuthorCard author={author} />
                    </div>
                  ))}
                </div>
              )}

              {page.textContent && (
                <div className="link-and-list-styles">
                  <StructuredContentDefault content={page.textContent} />
                </div>
              )}

              {isArray(page.tags) && (
                <div className="new-tags mb-5">
                  {page.tags.map((tag) => (
                    <Tag key={tag.id} basePath={basePath} slug={tag.slug} title={tag.title} />
                  ))}
                </div>
              )}

              {/* Form block */}
              {page.form && page.form[0] && <TextHubspotForm block={page.form[0]} />}
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
      model {
        apiKey
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
          ... on DatoCmsImage {
            __typename
            id: originalId
            image {
              gatsbyImageData
              alt
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
      audioUrl {
        id
        file {
          url
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
          alt
        }
      }
      form {
        ... on DatoCmsTextHubspotForm {
          id
          title
          description
          variant
          backgroundColor
          backgroundImage {
            url
            alt
            gatsbyImageData
          }
          smallTitle
          hubspot {
            ... on DatoCmsHubspot {
              id
              formId
              portalId
              region
            }
          }
        }
      }
    }
  }
`;

export default Podcast;
