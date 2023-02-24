import React, { useCallback, useState } from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Layout from '../../components/Layout/Layout';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import BackButton from '../../components/Global/BackButton/BackButton';
import SocialLinkList from '../../components/Global/SocialLink/SocialLinkList';
import Tag from '../../components/Global/Tag/Tag';
import Dropdown from '../../components/Global/Dropdown/Dropdown';
import SeoDatoCMS from '../../components/SeoDatoCms';

import './index.scss';

const Order = {
  ALPHABETICALLY: 'Alphabetically sorted (A-Z)',
  TEST: 'Test',
};

function Member({ pageContext, location, data: { page } }) {
  const parties = page.parties;

  const [orderBy, setOrderBy] = useState(Order.ALPHABETICALLY);

  const partiesOrdered = useCallback(() => {
    //
    console.log('Ordenar parties por ', orderBy);

    const ordered = parties.sort((current, previous) => {
      const currentTitle = current.title.toUpperCase();
      const previousTitle = previous.title.toUpperCase();

      if (currentTitle < previousTitle) {
        return -1;
      }
      if (currentTitle > previousTitle) {
        return 1;
      }

      return 0;
    });

    return ordered;
  }, [orderBy]);

  const handleOnChangeOrderBy = (newOrder) => setOrderBy(newOrder);

  return (
    <Layout>
      <HeroPage
        title={pageContext.titleParent ? pageContext.titleParent : page.title}
        context={pageContext}
        location={location}
        date={page.date}
      />

      <div className="member-detail">
        <div className="top-member">
          <div className="container h-100">
            <div className="content">
              <diV className="head-content">
                {page.flag && <img src={page.flag.url} alt={page.flag.alt || 'Flag'} />}

                <h1>{page.title}</h1>

                {page.parties.length > 1 && <div className="member-size">{page.parties.length} Member Parties </div>}
              </diV>

              <div className="close-btn-container">
                <BackButton location={location} />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="mt-5">
            {partiesOrdered().length > 1 && (
              <Dropdown
                activeValue={orderBy}
                options={Object.values(Order).map((order) => {
                  return { label: order, onClick: () => handleOnChangeOrderBy(order) };
                })}
              />
            )}
          </div>

          <div className="content-member">
            {partiesOrdered()?.map((item) => {
              return (
                <div className="row mb-5 pb-0 pb-md-5">
                  <div className="col-lg-3">
                    <ImageWrapper image={item.logo} />
                  </div>

                  <div className="col-lg-8 offset-lg-1">
                    <div className="party-main-header">
                      <h3>{item.title}</h3>
                      <Tag title="Candidate" bgColor="primary-dark-green" />
                    </div>

                    <div className="information">
                      <div className="row">
                        <div className="col-lg-4">
                          <h4>Party Leaders:</h4>
                          <div className="party-leaders-text" dangerouslySetInnerHTML={{ __html: item.partyLeaders }} />
                        </div>

                        <div className="col-lg-5">
                          <h4>Contact details</h4>
                          <div
                            className="contact-details-text"
                            dangerouslySetInnerHTML={{ __html: item.contactDetails }}
                          />
                        </div>

                        <div className="col links-right">
                          <SocialLinkList links={item.socialsLinks} />
                        </div>
                      </div>
                    </div>

                    {/* <div className="history-container">
                      <h4>History</h4>
                      <div className="history-text" dangerouslySetInnerHTML={{ __html: item.history }} />
                    </div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const Head = ({ data: { page } }) => <SeoDatoCMS page={page} />;

export const MemberQuery = graphql`
  query MemberById($id: String) {
    page: datoCmsMember(id: { eq: $id }) {
      id
      title
      slug
      flag {
        url
        alt
      }
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
