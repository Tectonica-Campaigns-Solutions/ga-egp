import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Layout from '../../components/Layout/Layout';
import JobLocation from '../../components/Global/JobLocation/JobLocation';
import Button from '../../components/Global/Button/Button';
import SeoDatoCMS from '../../components/SeoDatoCms';

import * as styles from './job.module.scss';

const JonOpportunity = ({ pageContext, location, data: { job } }) => {
  const { title, description, content, urlApply, isRemote, location: locationJob } = job;

  return (
    <Layout>
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
              {description && <p className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />}

              {/* Main content */}
              {content && <p dangerouslySetInnerHTML={{ __html: content }} />}
              <p />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ data: { page } }) => <SeoDatoCMS page={page} />;

export const JobQuery = graphql`
  query JobById($id: String) {
    job: datoCmsJobOpportunity(id: { eq: $id }) {
      title
      slug
      urlApply
      location
      description
      content
      publicationDate
      isRemote
    }
  }
`;

export default JonOpportunity;
