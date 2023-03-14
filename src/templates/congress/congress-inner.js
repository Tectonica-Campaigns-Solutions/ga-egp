import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCms from '../../components/SeoDatoCms';

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
      </InnerLayout>
    </Layout>
  );
}

export const CongressInnerQuery = graphql`
  query CongressInnerById($id: String) {
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
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;

export default CongressInner;
