import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import DetailDocLayout from '../../components/Layout/DetailDocLayout/DetailDocLayout';
import SeoDatoCms from '../../components/SeoDatoCms';

import './index.scss';

const Resolution = ({ pageContext, location, data: { resolution, breadcrumb, favicon, siteTitle } }) => {
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

            <hr />

            {resolution.footnotes.map((item) => {
              return <div id={item.anchorId}>{item.text}</div>;
            })}
          </DetailDocLayout>
        </div>
      </div>
    </Layout>
  );
};

export default Resolution;

export const ResolutionQuery = graphql`
  query ResolutionById($id: String, $menuPos: String) {
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
    }
  }
`;
