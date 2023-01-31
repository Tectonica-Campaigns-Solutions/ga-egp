import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Link from '../../components/Global/Link';
import StructuredContentDefault from '../../components/StructuredContentDefault ';
import HeroPage from '../../components/Global/HeroPage/HeroPage';

import './index.scss';

const Resolution = ({ pageContext, location, data: { resolution } }) => {
  return (
    <Layout>
      <HeroPage
        title={resolution.title}
        context={pageContext}
        location={location}
        date={resolution.date}
        isDetailView
      />

      <div className="resolution-detail">
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-lg-10">
              <h1>{resolution.title}</h1>

              {resolution.intro && <div dangerouslySetInnerHTML={{ __html: resolution.intro }} />}
              {resolution.text && <StructuredContentDefault content={resolution.text} />}

              <hr />

              {resolution.footnotes.map((item) => {
                return <div id={item.anchorId}>{item.text}</div>;
              })}
            </div>

            <div className="col-lg-2">
              {resolution.documents.map((item) => {
                return <Link to={item.url}>{item.title ? item.title : item.filename}</Link>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resolution;

export const ResolutionQuery = graphql`
  query ResolutionById($id: String) {
    resolution: datoCmsResolution(id: { eq: $id }) {
      id
      title
      slug
      intro
      date
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
