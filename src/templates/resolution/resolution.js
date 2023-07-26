import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import DetailDocLayout from '../../components/Layout/DetailDocLayout/DetailDocLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import TextHubspotForm from '../../components/Blocks/TextHubspotForm/TextHubsportForm';
import Section from '../../components/Global/Section/Section';
import CardPolicy from '../../components/Global/CardPolicy/CardPolicy';

import './index.scss';

const Resolution = ({
  pageContext,
  location,
  data: { resolution, relatedResolutions, breadcrumb, favicon, siteTitle },
}) => {
  console.log({ breadcrumb });

  return (
    <Layout>
      <SeoDatoCms seo={resolution.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={resolution.title}
        context={pageContext}
        location={location}
        date={resolution.date}
        isDetailView
        breadcrumb={breadcrumb}
      />

      <div className="resolution-detail">
        <div className="container mt-5 pt-5">
          <DetailDocLayout documents={resolution.documents} withOffset>
            <h1>{resolution.title}</h1>

            {resolution.intro && <div dangerouslySetInnerHTML={{ __html: resolution.intro }} />}
            {resolution.text?.value && <StructuredContentDefault content={resolution.text} />}

            {resolution.footnotes && resolution.footnotes.length > 0 && (
              <>
                <hr />

                {resolution.footnotes.map((item, index) => {
                  return (
                    <div id={item.anchorId} key={`${item.text}-${index}`}>
                      {item.text}
                    </div>
                  );
                })}
              </>
            )}
          </DetailDocLayout>
        </div>
      </div>

      {resolution.form && resolution.form[0] && <TextHubspotForm block={resolution.form[0]} />}

      {/* Resolutions related */}
      {relatedResolutions && relatedResolutions.edges && (
        <Section
          title="more resolutions"
          bgColor="section-green"
          link={{
            label: 'See all resolutions',
          }}
        >
          {relatedResolutions.edges.map((resolution) => (
            <div key={resolution.node.id} className="mb-5">
              <CardPolicy item={resolution.node} />
            </div>
          ))}
        </Section>
      )}
    </Layout>
  );
};

export default Resolution;

export const ResolutionQuery = graphql`
  query ResolutionById($id: String, $menuPos: String, $councilId: String) {
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
    relatedResolutions: allDatoCmsResolution(limit: 3, filter: { council: { id: { eq: $councilId } } }) {
      edges {
        node {
          ...CardResolution
        }
      }
    }
    resolution: datoCmsResolution(id: { eq: $id }) {
      id
      title
      slug
      intro
      date
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      text {
        value
      }
      documents {
        internalName
        language
        document {
          path
          url
          title
        }
      }
      footnotes {
        anchorId
        text
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
