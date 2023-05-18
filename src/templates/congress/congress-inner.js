import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Blocks from '../../components/Blocks';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import { isArray } from '../../utils';

import * as styles from './congress-inner.module.scss';

function CongressInner({ location, data: { congressInner, congressParent, favicon, siteTitle } }) {
  const { title, backgroundColor, backgroundImageForInnerPages, ctas = [], pages: congressMenu = [], isCongress } = congressParent;

  const sidebarLinks = () => {
    const items = congressMenu;
    return <>{items && <SidebarNav menu={items} location={location} />}</>;
  };

  return (
    <Layout navbarWhite>
      <SeoDatoCms seo={congressInner.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroCongress title={title} bgColor={backgroundColor} bgImage={backgroundImageForInnerPages} ctas={ctas} isCongress={isCongress} />

      <InnerLayout sideNav={sidebarLinks()}>
        <h1 className={styles.mainTitle}>{congressInner.title}</h1>
        {isArray(congressInner.blocks) && <Blocks blocks={congressInner.blocks} />}
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
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    congressParent: datoCmsCongress(id: { eq: $parentId }) {
      title
      slug
      introduction
      backgroundColor
      isCongress
      backgroundImageForInnerPages {
        url
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
