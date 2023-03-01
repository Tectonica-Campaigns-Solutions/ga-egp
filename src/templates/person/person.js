import React from 'react';
import { graphql } from 'gatsby';
import HeroPage from '../../components/Global/HeroPage/HeroPage';
import Layout from '../../components/Layout/Layout';
import ImageWrapper from '../../components/Global/Image/ImageWrapper';
import BackButton from '../../components/Global/BackButton/BackButton';
import SocialLinkList from '../../components/Global/SocialLink/SocialLinkList';
import TextIcon from '../../components/Global/TextIcon/TextIcon';
import iconEmail from '../../components/Icons/icon_email.svg';
import { getPhoneLink } from '../../utils';
import SeoDatoCms from '../../components/SeoDatoCms';

import './index.scss';

function person({ pageContext, location, data: { person, favicon, siteTitle } }) {
  return (
    <Layout>
      <SeoDatoCms seo={person.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroPage title={person.title} context={pageContext} location={location} />
      <div className="person-detail">
        <div className="btn-back">
          <BackButton location={location} animated />
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">{person.image && <ImageWrapper image={person.image} />}</div>

            <div className="col-lg-7">
              <h1>{person.name}</h1>
              <div className="position">{person.jobPosition}</div>

              <SocialLinkList links={person.socialLinks} iconWhite />
              {person.phone && (
                <TextIcon icon={iconEmail} text={<a href={getPhoneLink(person.phone)}>{person.phone}</a>} textWhite />
              )}

              {person.description && (
                <div className="description" dangerouslySetInnerHTML={{ __html: person.description }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const PersonQuery = graphql`
  query PersonById($id: String) {
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
    person: datoCmsPerson(id: { eq: $id }) {
      name
      phone
      email
      jobPosition
      socialLinks {
        url
        socialNetwork
      }
      description
      image {
        gatsbyImageData
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;

export default person;
