import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Layout from '../../components/Layout/Layout';
import { GatsbyImage } from 'gatsby-plugin-image';
import BackButton from '../../components/Global/BackButton/BackButton';

import './index.scss';

function Member({ pageContext, location, data: { page } }) {
  return (
    <Layout>
      <HeroPage
        title={pageContext.titleParent ? pageContext.titleParent : page.title}
        context={pageContext}
        location={location}
        date={page.date}
      />
      <div className="container member-detail">
        <div className="top-member d-flex justify-content-between">
          <h1>{page.title}</h1>
          {page.parties.length > 1 && <div>{page.parties.length} Member Parties </div>}
          <BackButton location={location} />
        </div>

        <div className="content-member">
          {page.parties.map((item) => {
            return (
              <div className="row mb-5 pb-5">
                <div className="col-lg-3">
                  <GatsbyImage image={item.logo?.gatsbyImageData} />
                </div>

                <div className="col-lg-8 offset-lg-1">
                  <h3>{item.title}</h3>

                  <div className="row">
                    <div className="col">
                      <h4>Party Leaders:</h4>
                      <div className="party-leaders-text" dangerouslySetInnerHTML={{ __html: item.partyLeaders }} />
                    </div>

                    <div className="col">
                      <h4>Contact details</h4>
                      <div className="contact-details-text" dangerouslySetInnerHTML={{ __html: item.contactDetails }} />
                    </div>

                    <div className="col">
                      {item.socialsLinks.map((el) => {
                        return <div>{el.url}</div>;
                      })}
                    </div>
                  </div>

                  <div className="history-container">
                    <h4>History</h4>
                    <div className="history-text" dangerouslySetInnerHTML={{ __html: item.history }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export const MemberQuery = graphql`
  query MemberById($id: String) {
    page: datoCmsMember(id: { eq: $id }) {
      id
      title
      slug
      seo {
        title
        description
      }
      parties {
        ... on DatoCmsParty {
          title
          contactDetails
          partyLeaders
          history
          logo {
            gatsbyImageData
            url
          }
          socialsLinks {
            url
            socialNetwork
          }
        }
      }
    }
  }
`;

export default Member;
