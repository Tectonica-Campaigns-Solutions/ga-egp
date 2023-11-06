import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import { basePathTag, isArray } from '../../utils';
import Tag from '../../components/Global/Tag/Tag';
import SeoDatoCms from '../../components/SeoDatoCms';
import LatestUpdates from '../../components/Blocks/LatestUpdates/LatestUpdates';
import TextHubspotForm from '../../components/Blocks/TextHubspotForm/TextHubsportForm';

import './index.scss';

const PressRelease = ({ pageContext, location, data: { page, breadcrumb, favicon, siteTitle } }) => {
  const {
    seo,
    title,
    date,
    textContent,
    tags = [],
    oldNid,
    model: { apiKey },
  } = page;
  const basePath = basePathTag(apiKey);

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
              {textContent && (
                <div className={`post-text-content link-and-list-styles ${oldNid ? 'importer-post' : ''}`}>
                  <StructuredContentDefault content={textContent} />
                </div>
              )}

              {isArray(tags) && (
                <div className="new-tags">
                  {tags.map((tag) => (
                    <Tag key={tag.id} basePath={basePath} slug={tag.slug} title={tag.title} variant={tag.color} />
                  ))}
                </div>
              )}

              {/* Form block */}
              {page.form && page.form[0] && <TextHubspotForm block={page.form[0]} />}
            </div>
          </div>
        </div>

        <LatestUpdates
          block={{
            title: 'Related Press Releases',
            link: {
              label: 'See all press releases',
              content: {
                slug: 'press-releases',
                model: {
                  apiKey: 'list_press_release',
                },
              },
            },
          }}
        />
      </div>
    </Layout>
  );
};

export const PressReleaseQuery = graphql`
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
    page: datoCmsPressRelease(id: { eq: $id }) {
      id
      title
      slug
      model {
        apiKey
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
          ... on DatoCmsEmbedVideo {
            id: originalId
            __typename
            video {
              url
              providerUid
            }
          }
          ... on DatoCmsEmbedIframe {
            __typename
            id: originalId
            embedCode
          }
          ... on DatoCmsImage {
            __typename
            id: originalId
            image {
              gatsbyImageData
              alt
              title
            }
          }
        }
      }
      tags {
        ... on DatoCmsTagNews {
          id
          slug
          title
          color
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

export default PressRelease;
