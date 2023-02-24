import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SeoDatoCMS from '../../components/SeoDatoCms';

function CongressInner({ pageContext, data: { congressInner } }) {
  const { congressTitle, congressSlug, congressMenu } = pageContext;

  const sidebarLinks = () => {
    const items = congressMenu;
    return <>{items && <SidebarNav menu={items} />}</>;
  };

  return (
    <Layout>
      <HeroCongress title={congressTitle} />

      <InnerLayout sideNav={sidebarLinks()}>
        <h1>{congressInner.title}</h1>
      </InnerLayout>
    </Layout>
  );
}

export const Head = ({ data: { page } }) => <SeoDatoCMS page={page} />;

export const CongressInnerQuery = graphql`
  query CongressInnerById($id: String) {
    congressInner: datoCmsCongressInnerPage(id: { eq: $id }) {
      title
    }
  }
`;

export default CongressInner;
