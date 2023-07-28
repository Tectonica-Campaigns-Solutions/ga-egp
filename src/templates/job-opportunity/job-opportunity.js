import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Layout from '../../components/Layout/Layout';
import JobLocation from '../../components/Global/JobLocation/JobLocation';
import Button from '../../components/Global/Button/Button';
import SeoDatoCms from '../../components/SeoDatoCms';

import * as styles from './job.module.scss';

const JonOpportunity = ({ pageContext, location, data: { job, favicon, siteTitle } }) => {
  const { title, description, content, urlApply, isRemote, location: locationJob } = job;

  return (
    <Layout>
      <SeoDatoCms seo={job.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={title}
        context={pageContext}
        location={location}
        date={<JobLocation isRemote={isRemote} location={locationJob} />}
        isDetailView
        children={<Button label="Apply" url={urlApply} />}
      />

      <div className="container">
        <div className="post-detail">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {/* Short description */}
              {description && (
                <p
                  className={`${styles.description} link-and-list-styles`}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}

              {/* Main content */}
              {content && <p className="link-and-list-styles" dangerouslySetInnerHTML={{ __html: content }} />}
              <p />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JonOpportunity;

export const JobQuery = graphql`
  query JobById($id: String) {
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
    job: datoCmsJobOpportunity(id: { eq: $id }) {
      title
      slug
      urlApply
      location
      description
      content
      publicationDate
      isRemote
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
