import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import Blocks from '../../components/Blocks';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../../components/SeoDatoCms';
import { isArray } from '../../utils';

// todo on querys
// TODO ctas
// TODO images
function CongressInner({ pageContext, location, data: { congressInner, favicon, siteTitle } }) {
  const { congressTitle, congressMenu } = pageContext;

  const sidebarLinks = () => {
    const items = congressMenu;
    return <>{items && <SidebarNav menu={items} location={location} />}</>;
  };

  return (
    <Layout>
      <SeoDatoCms seo={congressInner.seo} favicon={favicon} siteTitle={siteTitle} />

      <HeroCongress title={congressTitle} />

      <InnerLayout sideNav={sidebarLinks()}>
        <h1>{congressInner.title}</h1>
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
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    congressParent: datoCmsCongress(id: { eq: $parentId }) {
      title
    }
  }
`;

export default CongressInner;
