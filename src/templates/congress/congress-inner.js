import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Blocks from '../../components/Blocks';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import { isArray } from '../../utils';
import SessionDetail from './session-detail';

import * as styles from './congress-inner.module.scss';

function CongressInner({ location, data: { congressInner, congressParent, favicon, siteTitle } }) {
  const [showPlenary, setShowPlenary] = useState(null);

  const {
    title,
    backgroundColor,
    backgroundImageForInnerPages,
    ctas = [],
    pages: congressMenu = [],
    isCongress,
    slug,
    label,
  } = congressParent;

  useEffect(() => {
    setShowPlenary(null);
    const params = new URLSearchParams(window.location.search);

    if (params.has('item')) {
      const maybeListSessionBlock = congressInner.blocks.find((b) => b.__typename === 'DatoCmsListSession');
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

        setShowPlenary(existSession);
      }
    }
  });

  const sidebarLinks = () => {
    const items = congressMenu;
    return (
      <>
        {items && (
          <SidebarNav
            menu={items}
            location={location}
            landing={{ title: congressParent.label != '' ? congressParent.label : 'Start', slug }}
          />
        )}
      </>
    );
  };

  return (
    <Layout navbarWhite>
      <SeoDatoCms seo={congressInner.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroCongress
        title={title}
        bgColor={backgroundColor}
        bgImage={backgroundImageForInnerPages}
        ctas={ctas}
        isCongress={isCongress}
      />

      <InnerLayout sideNav={sidebarLinks()} landing={{ title: label, slug }}>
        <h1 className={styles.mainTitle}>{congressInner.title}</h1>
        {isArray(congressInner.blocks) && !showPlenary && <Blocks blocks={congressInner.blocks} />}

        {showPlenary && <SessionDetail session={showPlenary} />}
      </InnerLayout>
    </Layout>
  );
}

export const CongressInnerQuery = graphql`
  query CongressInnerById($id: String, $parentId: String) {
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
    congressInner: datoCmsCongressInnerPage(id: { eq: $id }) {
      title
      blocks {
        ...BlockTextSimple
        ...BlockListSessions
        ... on DatoCmsEmbedIframe {
          __typename
          originalId
          embedCode
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    congressParent: datoCmsCongress(id: { eq: $parentId }) {
      title
      slug
      label
      introduction
      backgroundColor
      isCongress
      backgroundImageForInnerPages {
        url
        alt
        gatsbyImageData
      }
      ctas {
        ...BlockCta
      }
      date
      isCongress
      pages {
        id
        title
        slug
        model {
          apiKey
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;

export default CongressInner;
