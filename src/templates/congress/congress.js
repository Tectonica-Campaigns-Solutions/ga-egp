import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/Layout/Layout';
import HeroCongress from '../../components/Global/HeroCongress/HeroCongress';
import InnerLayout from '../../components/Layout/InnerLayout/InnerLayout';
import SidebarNav from '../../components/Global/SidebarNav/SidebarNav';

function Congress({ data: { congress } }) {
  const sidebarLinks = () => {
    const items = congress.pages;

    return <>{items && <SidebarNav menu={items} />}</>;
  };

  return (
    <Layout>
      <HeroCongress title={congress.title} mainPage={true} />

      <div className="congress-detail">
        <InnerLayout navMenu={sidebarLinks()}>
          <h1>{congress.title}</h1>
        </InnerLayout>
      </div>
    </Layout>
  );
}

export const CongressQuery = graphql`
  query CongressById($id: String) {
    congress: datoCmsCongress(id: { eq: $id }) {
      title
      pages {
        ... on DatoCmsCongressInnerPage {
          title
          slug
          id
        }
      }
    }
  }
`;

export default Congress;
