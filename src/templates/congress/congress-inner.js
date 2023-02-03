import React from 'react'
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout'
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import Link from '../../components/Global/Link';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';

function CongressInner({ pageContext, data: { congressInner } }) {
  const { congressTitle, congressSlug, congressMenu } = pageContext
  const sidebarLinks = () => {
    const items = congressMenu;
    return <>{items && <SidebarNav menu={items} />}</>;
  };
  return (
    <Layout>
       <InnerLayout navMenu={sidebarLinks()}>
          <HeroCongress title={congressTitle}/>
          <h1>{congressInner.title}</h1>
        </InnerLayout>
      
      
    </Layout>
  )
}

export const CongressInnerQuery = graphql`
  query CongressInnerById($id: String) {
    congressInner: datoCmsCongressInnerPage(id: { eq: $id }) {
      title
    }
  }
`;

export default CongressInner