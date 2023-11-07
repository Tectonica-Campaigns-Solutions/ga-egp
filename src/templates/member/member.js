import React, { useCallback, useState } from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Layout from '../../components/Layout/Layout';
import BackButton from '../../components/Global/BackButton/BackButton';
import SocialLinkList from '../../components/Global/SocialLink/SocialLinkList';
import Tag from '../../components/Global/Tag/Tag';
import Dropdown from '../../components/Global/Dropdown/Dropdown';
import SeoDatoCms from '../../components/SeoDatoCms';

import './index.scss';

const Order = {
  ALPHABETICALLY: 'Alphabetically sorted (A-Z)',
  TEST: 'Test',
};

function Member({ pageContext, location, data: { page, members, breadcrumb, favicon, siteTitle } }) {
  const parties = members.edges;

  const [orderBy, setOrderBy] = useState(Order.ALPHABETICALLY);

  const partiesOrdered = useCallback(() => {
    // console.log('Ordenar parties por ', orderBy);

    const ordered = parties.sort((current, previous) => {
      const currentTitle = current.node.title.toUpperCase();
      const previousTitle = previous.node.title.toUpperCase();

      if (currentTitle < previousTitle) {
        return -1;
      }
      if (currentTitle > previousTitle) {
        return 1;
      }

      return 0;
    });

    return ordered;
  }, [orderBy, parties]);

  const handleOnChangeOrderBy = (newOrder) => setOrderBy(newOrder);

  return (
    <Layout>
      <SeoDatoCms seo={page.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage
        title={pageContext.titleParent ? pageContext.titleParent : page.title}
        context={pageContext}
        location={location}
        date={page.date}
        breadcrumb={breadcrumb}
      />

      <div className="member-detail">
        <div className="top-member">
          <div className="container h-100">
            <div className="content">
              <div className="head-content">
                {page.flag && <img src={page.flag.url} alt={page.flag.alt || 'Flag'} />}

                <h1>{page.title}</h1>

                {parties.length > 1 && <div className="member-size">{parties.length} Member Parties </div>}
              </div>

              <div className="close-btn-container">
                <BackButton location={location} defaultBack />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          {/* <div className="mt-5">
            {partiesOrdered().length > 1 && (
              <Dropdown
                activeValue={orderBy}
                options={Object.values(Order).map((order) => {
                  return { label: order, onClick: () => handleOnChangeOrderBy(order) };
                })}
              />
            )}
          </div> */}

          <div className="content-member">
            {partiesOrdered()?.map((el) => {
              const item = el.node;
              return (
                <div className="row mb-5 pb-0 pb-md-5" key={item.id}>
                  <div className="col-lg-3 col-7">
                    <div className="col-image">{item.logo && <img src={item.logo} />}</div>
                  </div>

                  <div className="col-lg-8 offset-lg-1 mt-4 mt-lg-0">
                    <div className="party-main-header">
                      <h3>{item.title}</h3>
                      {item.status && (
                        <Tag title={item.status} bgColor={`color-${item.status.toLowerCase().replace(' ', '')}`} />
                      )}
                    </div>

                    <div className="information">
                      <div className="row">
                        {item.contacts && item.contacts.length > 0 && (
                          <div className="col-lg-4 party-leaders">
                            <h4>Party Leaders:</h4>
                            {item.contacts.map((item, index) => {
                              return <p key={`${item.name}-${index}`}>{item.name}</p>;
                            })}
                          </div>
                        )}
                        {(item.contact.website || item.contact.email) && (
                          <div className="col-lg-5">
                            <h4>Contact details</h4>
                            <div className="contact-details-text">
                              {item.contact?.website && (
                                <p>
                                  <a href={`//${item.contact?.website}`}>{item.contact.website}</a>
                                </p>
                              )}
                              {item.contact?.email && (
                                <p>
                                  <a href={`mailto:${item.contact?.email}`}>{item.contact.email}</a>
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="col links-right">
                          <SocialLinkList links={item.social} />
                        </div>
                      </div>
                    </div>
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

export const MemberQuery = graphql`
  query MemberById($id: String, $menuPos: String, $isoCode: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    breadcrumb: datoCmsMenu(id: { eq: $menuPos }) {
      ...Breadcrumb
    }
    siteTitle: datoCmsSite {
      globalSeo {
        siteName
      }
    }
    page: datoCmsMember(id: { eq: $id }) {
      id
      title
      slug
      flag {
        url
        alt
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    members: allMemberParty(filter: { iso_code: { eq: $isoCode } }) {
      edges {
        node {
          id
          title
          logo
          contacts {
            name
          }
          social {
            url
            socialNetwork
          }
          contact {
            website
            email
          }
          status
        }
      }
    }
  }
`;

export default Member;
