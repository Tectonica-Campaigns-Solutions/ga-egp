import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import SeoDatoCms from '../../components/SeoDatoCms';
import { isArray } from '../../utils';
import Blocks from '../../components/Blocks';
import CtaList from '../../components/Global/Cta/CtaList';
import InnerNavigation from '../../components/Global/InnerNavigation/InnerNavigation';

import * as styles from './congress.module.scss';

function Congress({ location, data: { congress, favicon, siteTitle } }) {
  const {
    slug,
    title,
    label,
    introduction,
    congressIntroduction,
    backgroundColor,
    backgroundImage,
    ctas = [],
    pages,
    seo,
  } = congress;

  const sidebarLinks = () => {
    const items = pages;
    return (
      <>
        {items && (
          <SidebarNav menu={items} location={location} landing={{ title: label !== '' ? label : 'Start', slug }} />
        )}
      </>
    );
  };

  const hasStartPage = congressIntroduction && congressIntroduction[0];

  // Map pages collection to use InnerNavigation component
  const mobileLinks = pages.map((p, index) => ({
    hideInInnerNavigation: false,
    position: index,
    title: p.title,
    content: {
      model: {
        apiKey: p.model.apiKey,
      },
      slug: p.slug,
    },
  }));
  mobileLinks.unshift({
    hideInInnerNavigation: false,
    position: -1,
    title: 'Start',
    content: {
      model: {
        apiKey: null,
      },
      slug: slug,
    },
  });

  return (
    <Layout navbarWhite>
      <SeoDatoCms seo={seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroCongress
        title={title}
        introduction={introduction}
        ctas={ctas}
        bgImage={backgroundImage}
        bgColor={backgroundColor}
        mainPage={true}
        isCongress={congress.isCongress}
      />

      <div className={`${styles.congressDetail}`}>
        <div className="d-block d-lg-none">
          <InnerNavigation location={location} innerMenu={{ treeChildren: mobileLinks }} />
        </div>

        <InnerLayout sideNav={sidebarLinks()}>
          <div className={styles.topContent}>
            <span>Start</span>
            {hasStartPage && (
              <>
                <h1>{congressIntroduction[0].title}</h1>
                <p className={styles.date}>{congressIntroduction[0].manualDate}</p>

                <CtaList ctas={congressIntroduction[0].cta} />
              </>
            )}
          </div>

          {isArray(congress.blocks) && <Blocks blocks={congress.blocks} />}
        </InnerLayout>
      </div>
    </Layout>
  );
}

export const CongressQuery = graphql`
  query CongressById($id: String) {
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
    congress: datoCmsCongress(id: { eq: $id }) {
      slug
      title
      label
      introduction
      backgroundColor
      backgroundImage {
        url
        alt
        gatsbyImageData
      }
      backgroundImageForInnerPages {
        url
        alt
        gatsbyImageData
      }
      ctas {
        ...BlockCta
      }
      congressIntroduction {
        id
        preTitle
        title
        manualDate
        cta {
          ... on DatoCmsCta {
            id
            title
            isButton
            link {
              ... on DatoCmsGlobalLink {
                id
                label
                url
                content {
                  __typename
                  ... on DatoCmsPage {
                    ...PageLink
                  }
                }
              }
            }
          }
        }
      }
      date
      isCongress
      pages {
        ... on DatoCmsCongressInnerPage {
          title
          slug
          id
          model {
            apiKey
          }
        }
      }
      blocks {
        ...BlockTextSimple
        ...BlockListSessions
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;

export default Congress;
