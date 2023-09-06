import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import SeoDatoCms from '../../components/SeoDatoCms';
import { isArray } from '../../utils';
import Blocks from '../../components/Blocks';
import SessionDetail from './session-detail';
import CtaList from '../../components/Global/Cta/CtaList';

import * as styles from './congress.module.scss';

function Congress({ location, data: { congress, favicon, siteTitle } }) {
  const [showPlenary, setShowPlenary] = useState(null);
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

  useEffect(() => {
    setShowPlenary(null);
    const params = new URLSearchParams(window.location.search);

    if (params.has('item')) {
      const maybeListSessionBlock = congress.blocks.find((b) => b.__typename === 'DatoCmsListSession');

      if (maybeListSessionBlock) {
        let existSession = null;

        const sessionItems = maybeListSessionBlock.sessionItems;
        const paramId = params.get('item').replace('DatoCmsSession-', '');

        for (const item of sessionItems) {
          const sessionItem = item.session.find((s) => s.id.replace('DatoCmsSession-', '') === paramId);

          if (sessionItem) {
            existSession = sessionItem;
            break;
          }
        }

        // console.log({ existSession });
        setShowPlenary(existSession);
      }
    }
  });

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

      <div className={styles.congressDetail}>
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

          {isArray(congress.blocks) && !showPlenary && <Blocks blocks={congress.blocks} />}

          {showPlenary && <SessionDetail session={showPlenary} />}
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
